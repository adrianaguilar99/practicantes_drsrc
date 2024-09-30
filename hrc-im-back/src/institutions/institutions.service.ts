import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { IRequestUser } from 'src/common/interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Institution } from './entities/institution.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { SubmissionStatus, UserRole } from 'src/common/enums';
import { handleInternalServerError } from 'src/common/utils';
import { RESOURCE_NAME_ALREADY_EXISTS } from 'src/common/constants/constants';

@Injectable()
export class InstitutionsService {
  constructor(
    @InjectRepository(Institution)
    private readonly institutionRepository: Repository<Institution>,
    private readonly userService: UsersService,
  ) {}

  async create(
    createInstitutionDto: CreateInstitutionDto,
    { userId }: IRequestUser,
  ) {
    const user = await this.userService.findOne(userId);
    if (user.userRole === UserRole.SUPERVISOR_RH) {
      if (
        createInstitutionDto.status &&
        createInstitutionDto.status !== SubmissionStatus.PENDING
      ) {
        throw new ForbiddenException(
          `RH supervisors can only create careers with the status ${SubmissionStatus.PENDING}`,
        );
      }
    }
    try {
      const career = this.institutionRepository.create({
        ...createInstitutionDto,
        submittedBy: user,
      });
      return await this.institutionRepository.save(career);
    } catch (error) {
      if (error.code === '23505')
        throw new ConflictException(`${RESOURCE_NAME_ALREADY_EXISTS}`);
      handleInternalServerError(error.message);
    }
  }

  async findAll(reqUser: IRequestUser) {
    let institutions: Institution[] = [];
    try {
      if (reqUser.role === UserRole.ADMINISTRATOR) {
        institutions = await this.institutionRepository.find();
      } else {
        institutions = await this.institutionRepository.find({
          where: { status: SubmissionStatus.ACCEPTED },
        });
      }

      const secureInstitutions = institutions.map(
        ({ submittedBy, ...rest }) => {
          const { password, ...secureUser } = submittedBy;
          return { ...rest, submittedBy: secureUser };
        },
      );
      return secureInstitutions;
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }

  async findOne(id: string, reqUser: IRequestUser) {
    let institution: Institution;
    if (reqUser.role === UserRole.ADMINISTRATOR) {
      institution = await this.institutionRepository.findOne({
        where: { id },
      });
    } else {
      institution = await this.institutionRepository.findOne({
        where: { id, status: SubmissionStatus.ACCEPTED },
      });
    }
    if (!institution) throw new NotFoundException('Institution not found.');

    const { password, ...secureSubmittedBy } = institution.submittedBy;
    institution.submittedBy = secureSubmittedBy;
    return institution;
  }

  async update(
    id: string,
    updateInstitutionDto: UpdateInstitutionDto,
    reqUser: IRequestUser,
  ) {
    const institution = await this.findOne(id, reqUser);
    if (updateInstitutionDto.status === SubmissionStatus.REJECTED)
      return await this.remove(id);
    try {
      const careerToUpdate = await this.institutionRepository.preload({
        id,
        ...updateInstitutionDto,
      });

      const updatedInstitution =
        await this.institutionRepository.save(careerToUpdate);
      return { ...updatedInstitution, submmitedBy: institution.submittedBy };
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }
  async remove(id: string) {
    try {
      const deletedCareer = await this.institutionRepository.delete(id);
      return deletedCareer.affected;
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }

  async removeAll() {
    try {
      await this.institutionRepository.delete({});
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }
}
