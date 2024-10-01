import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';
import { Career } from './entities/career.entity';
import { UserRole, SubmissionStatus } from 'src/common/enums';
import { handleInternalServerError } from 'src/common/utils';
import { UsersService } from 'src/users/users.service';
import { IRequestUser } from 'src/common/interfaces';
import { RESOURCE_NAME_ALREADY_EXISTS } from 'src/common/constants/constants';

@Injectable()
export class CareersService {
  constructor(
    @InjectRepository(Career)
    private readonly careerRepository: Repository<Career>,
    private readonly userService: UsersService,
  ) {}

  async create(createCareerDto: CreateCareerDto, { userId }: IRequestUser) {
    const user = await this.userService.findOne(userId);
    if (user.userRole === UserRole.SUPERVISOR_RH) {
      if (
        createCareerDto.status &&
        createCareerDto.status !== SubmissionStatus.PENDING
      ) {
        throw new ForbiddenException(
          `RH supervisors can only create careers with the status ${SubmissionStatus.PENDING}`,
        );
      }
    }
    try {
      const career = this.careerRepository.create({
        ...createCareerDto,
        submittedBy: user,
      });
      return await this.careerRepository.save(career);
    } catch (error) {
      if (error.code === '23505')
        throw new ConflictException(`${RESOURCE_NAME_ALREADY_EXISTS}`);
      handleInternalServerError(error.message);
    }
  }

  async findAll(reqUser: IRequestUser) {
    let careers: Career[] = [];
    try {
      if (reqUser.role === UserRole.ADMINISTRATOR) {
        careers = await this.careerRepository.find();
      } else {
        careers = await this.careerRepository.find({
          where: { status: SubmissionStatus.ACCEPTED },
        });
      }

      const secureCareers = careers.map(({ submittedBy, ...rest }) => {
        const { password, ...secureUser } = submittedBy;
        return { ...rest, submittedBy: secureUser };
      });
      return secureCareers;
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }

  async findOne(id: string, reqUser: IRequestUser) {
    let career: Career;
    if (reqUser.role === UserRole.ADMINISTRATOR) {
      career = await this.careerRepository.findOne({
        where: { id },
      });
    } else {
      career = await this.careerRepository.findOne({
        where: { id, status: SubmissionStatus.ACCEPTED },
      });
    }
    if (!career) throw new NotFoundException('Career not found.');

    const { password, ...secureSubmittedBy } = career.submittedBy;
    career.submittedBy = secureSubmittedBy;
    return career;
  }
  async update(
    id: string,
    updateCareerDto: UpdateCareerDto,
    reqUser: IRequestUser,
  ) {
    const career = await this.findOne(id, reqUser);
    if (updateCareerDto.status === SubmissionStatus.REJECTED)
      return await this.remove(id, reqUser);
    try {
      const careerToUpdate = await this.careerRepository.preload({
        id,
        ...updateCareerDto,
      });

      const updatedCareer = await this.careerRepository.save(careerToUpdate);
      return { ...updatedCareer, submmitedBy: career.submittedBy };
    } catch (error) {
      if (error.code === '23505')
        throw new ConflictException(`${RESOURCE_NAME_ALREADY_EXISTS}`);
      handleInternalServerError(error.message);
    }
  }

  async remove(id: string, reqUser: IRequestUser) {
    // NECESITO ESAS TRES LINEAS DE CODIGO INNECESARIAS PARA DESPUES HACER LA TABLA DE AUDITS
    const user = await this.userService.findOne(reqUser.userId);
    if (user.userRole !== UserRole.ADMINISTRATOR)
      throw new ForbiddenException('Only administrators can delete careers.');
    try {
      const deletedCareer = await this.careerRepository.delete(id);
      if (!deletedCareer.affected)
        throw new NotFoundException('Career not found.');

      return deletedCareer.affected;
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }

  async removeAll() {
    try {
      await this.careerRepository.delete({});
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }
}
