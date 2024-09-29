import {
  Injectable,
  ForbiddenException,
  NotFoundException,
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

@Injectable()
export class CareersService {
  constructor(
    @InjectRepository(Career)
    private readonly careerRepository: Repository<Career>,
    private readonly userService: UsersService,
  ) {}

  async create(createCareerDto: CreateCareerDto, { userId }: IRequestUser) {
    try {
      const user = await this.userService.findOne(userId);
      if (user.userRole === UserRole.SUPERVISOR_RH) {
        if (
          createCareerDto.status &&
          createCareerDto.status !== SubmissionStatus.PENDING
        ) {
          throw new ForbiddenException(
            `Supervisors can only create careers with the status ${SubmissionStatus.PENDING}`,
          );
        }
        createCareerDto.status = SubmissionStatus.PENDING;
      }

      const career = this.careerRepository.create({
        ...createCareerDto,
        submittedBy: user,
      });
      return await this.careerRepository.save(career);
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }

  async findAll(reqUser: IRequestUser) {
    try {
      let careers: Career[];
      if (reqUser.role === UserRole.SUPERVISOR_RH) {
        careers = await this.careerRepository.find({
          where: { status: SubmissionStatus.ACCEPTED },
        });
      } else if (reqUser.role === UserRole.ADMINISTRATOR)
        careers = await this.careerRepository.find();

      const secureCareers = careers.map(({ submittedBy, ...rest }) => {
        const { password, ...secureUser } = submittedBy;
        return { ...rest, submittedBy: secureUser };
      });
      return secureCareers;
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }

  async findOne(id: string) {
    const career = await this.careerRepository.findOne({ where: { id } });
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
    const career = await this.findOne(id);
    if (updateCareerDto.status === SubmissionStatus.REJECTED) {
      await this.remove(id, reqUser);
      return { message: 'Career has been rejected and deleted.' };
    } else if (updateCareerDto.status) {
      career.status = updateCareerDto.status;
      return await this.careerRepository.save(career);
    }
    return career;
  }

  async remove(id: string, { userId }: IRequestUser) {
    // NECESITO ESAS TRES LINEAS DE CODIGO INNECESARIAS PARA DESPUES HACER LA TABLA DE AUDITS
    const user = await this.userService.findOne(userId);
    if (user.userRole !== UserRole.ADMINISTRATOR)
      throw new ForbiddenException('Only administrators can delete careers.');
    return await this.careerRepository.delete(id);
  }

  async removeAll() {
    try {
      await this.careerRepository.delete({});
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }
}
