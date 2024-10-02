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
import { SystemAuditsService } from 'src/system-audits/system-audits.service';

@Injectable()
export class InstitutionsService {
  constructor(
    @InjectRepository(Institution)
    private readonly institutionRepository: Repository<Institution>,
    private readonly userService: UsersService,
    private readonly systemAuditsService: SystemAuditsService,
  ) {}

  async create(
    createInstitutionDto: CreateInstitutionDto,
    { userId, role, fullName }: IRequestUser,
  ) {
    const user = await this.userService.findOne(userId);
    if (role === UserRole.SUPERVISOR_RH) {
      if (
        createInstitutionDto.status &&
        createInstitutionDto.status !== SubmissionStatus.PENDING
      ) {
        throw new ForbiddenException(
          `RH supervisors can only create institutions with the status ${SubmissionStatus.PENDING}`,
        );
      }
    }
    try {
      const newInstitution = this.institutionRepository.create({
        ...createInstitutionDto,
        submittedBy: user,
      });
      const createdInstitution =
        await this.institutionRepository.save(newInstitution);
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'CREATE INSTITUTION',
        { id: createdInstitution.id, name: createdInstitution.name },
        'SUCCESS',
      );
      return createdInstitution;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'TRY TO CREATE INSTITUTION',
        { id: null, name: createInstitutionDto.name },
        'FAILED TO CREATE INSTITUTION',
        error.message,
      );
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
      return await this.remove(id, reqUser);
    try {
      const institutionToUpdate = await this.institutionRepository.preload({
        id,
        ...updateInstitutionDto,
      });

      const updatedInstitution =
        await this.institutionRepository.save(institutionToUpdate);

      await this.systemAuditsService.createSystemAudit(
        {
          id: reqUser.userId,
          fullName: reqUser.fullName,
          role: reqUser.role,
        },
        'UPDATE INSTITUTION',
        { id: updatedInstitution.id, name: updatedInstitution.name },
        'SUCCESS',
      );
      return { ...updatedInstitution, submmitedBy: institution.submittedBy };
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        {
          id: reqUser.userId,
          fullName: reqUser.fullName,
          role: reqUser.role,
        },
        'TRY TO UPDATE INSTITUTION',
        { id, name: 'Update Error' },
        'FAILED TO UPDATE INSTITUTION',
        error.message,
      );
      if (error.code === '23505')
        throw new ConflictException(`${RESOURCE_NAME_ALREADY_EXISTS}`);
      handleInternalServerError(error.message);
    }
  }
  async remove(id: string, { fullName, role, userId }: IRequestUser) {
    try {
      const deletedInstitution = await this.institutionRepository.delete(id);
      if (!deletedInstitution.affected)
        throw new NotFoundException(`Institution with id: ${id} not found.`);

      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'DELETE INSTITUTION',
        { id, name: 'Institution' },
        'SUCCESS',
      );
      return deletedInstitution.affected;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'TRY TO DELETE INSTITUTION',
        { id, name: 'Institution' },
        'FAILED TO DELETE INSTITUTION',
        error.message,
      );
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
