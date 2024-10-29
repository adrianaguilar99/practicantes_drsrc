import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { IRequestUser } from 'src/common/interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Institution } from './entities/institution.entity';
import { Repository } from 'typeorm';
import { handleInternalServerError } from 'src/common/utils';
import { RESOURCE_NAME_ALREADY_EXISTS } from 'src/common/constants/constants';
import { SystemAuditsService } from 'src/system-audits/system-audits.service';

@Injectable()
export class InstitutionsService {
  constructor(
    @InjectRepository(Institution)
    private readonly institutionsRepository: Repository<Institution>,
    private readonly systemAuditsService: SystemAuditsService,
  ) {}

  async create(
    createInstitutionDto: CreateInstitutionDto,
    { userId, role, fullName }: IRequestUser,
  ) {
    try {
      const newInstitution =
        this.institutionsRepository.create(createInstitutionDto);
      const createdInstitution =
        await this.institutionsRepository.save(newInstitution);
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'CREATE INSTITUTION',
        { id: createdInstitution.id, data: createdInstitution.name },
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
        { id: null, data: createInstitutionDto.name },
        'FAILED TO CREATE INSTITUTION',
        error.message,
      );
      if (error.code === '23505')
        throw new ConflictException(`${RESOURCE_NAME_ALREADY_EXISTS}`);
      handleInternalServerError(error.message);
    }
  }

  async findAll() {
    try {
      const institutions = await this.institutionsRepository.find({
        order: { createdAt: 'DESC' },
      });
      return institutions;
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }

  async findOne(id: string) {
    const institution = await this.institutionsRepository.findOne({
      where: { id },
    });
    if (!institution) throw new NotFoundException('Institution not found.');
    return institution;
  }

  async update(
    id: string,
    updateInstitutionDto: UpdateInstitutionDto,
    reqUser: IRequestUser,
  ) {
    await this.findOne(id);
    try {
      const institutionToUpdate = await this.institutionsRepository.preload({
        id,
        ...updateInstitutionDto,
      });
      const updatedInstitution =
        await this.institutionsRepository.save(institutionToUpdate);
      await this.systemAuditsService.createSystemAudit(
        {
          id: reqUser.userId,
          fullName: reqUser.fullName,
          role: reqUser.role,
        },
        'UPDATE INSTITUTION',
        { id, data: updatedInstitution.name },
        'SUCCESS',
      );
      return updatedInstitution;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        {
          id: reqUser.userId,
          fullName: reqUser.fullName,
          role: reqUser.role,
        },
        'TRY TO UPDATE INSTITUTION',
        { id, data: `${updateInstitutionDto.name}` },
        'FAILED TO UPDATE INSTITUTION',
        error.message,
      );
      if (error.code === '23505')
        throw new ConflictException(`${RESOURCE_NAME_ALREADY_EXISTS}`);
      handleInternalServerError(error.message);
    }
  }
  async remove(id: string, { fullName, role, userId }: IRequestUser) {
    const existingInstitution = await this.findOne(id);
    try {
      const deletedInstitution = await this.institutionsRepository.delete(id);
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'DELETE INSTITUTION',
        { id, data: existingInstitution.name },
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
        { id, data: existingInstitution.name },
        'FAILED TO DELETE INSTITUTION',
        error.message,
      );
      handleInternalServerError(error.message);
    }
  }

  async removeAll({ fullName, role, userId }: IRequestUser) {
    try {
      // Obtener todos las instituciones
      const allInstitutions = await this.institutionsRepository
        .createQueryBuilder('institution')
        .leftJoinAndSelect('institution.interns', 'intern')
        .getMany();

      // Filtrar instituciones sin relaciones activas (sin practicantes)
      const institutionsWithoutRelations = allInstitutions.filter(
        (i) => !i.interns.length,
      );

      if (institutionsWithoutRelations.length === 0)
        return 'No institutions without relations to delete.';

      // Eliminar solo los departamentos sin relaciones
      const institutions = institutionsWithoutRelations.map((i) => i.id);
      await this.institutionsRepository.delete(institutions);
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'DELETE ALL INSTITUTIONS',
        {
          id: institutions.toString(),
          data: `${[...institutionsWithoutRelations]}`,
        },
        'SUCCESS',
      );

      return `Deleted institutions without relations: ${institutionsWithoutRelations
        .map((i) => i.name)
        .join(', ')}`;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'TRY TO DELETE ALL INSTITUTIONS',
        { id: null, data: 'Institutions' },
        'FAILED TO DELETE ALL INSTITUTIONS',
        error.message,
      );
      handleInternalServerError(error.message);
    }
  }
}
