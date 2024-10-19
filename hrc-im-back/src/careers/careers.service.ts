import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';
import { Career } from './entities/career.entity';
import { handleInternalServerError } from 'src/common/utils';
import { IRequestUser } from 'src/common/interfaces';
import { RESOURCE_NAME_ALREADY_EXISTS } from 'src/common/constants/constants';
import { SystemAuditsService } from 'src/system-audits/system-audits.service';

@Injectable()
export class CareersService {
  constructor(
    @InjectRepository(Career)
    private readonly careersRepository: Repository<Career>,
    private readonly systemAuditsService: SystemAuditsService,
  ) {}

  async create(
    createCareerDto: CreateCareerDto,
    { fullName, role, userId }: IRequestUser,
  ) {
    const newCareer = this.careersRepository.create(createCareerDto);
    try {
      const createdCareer = await this.careersRepository.save(newCareer);
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'CREATE CAREER',
        { id: createdCareer.id, name: createdCareer.name },
        'SUCCESS',
      );
      return createdCareer;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'TRY TO CREATE CAREER',
        { id: null, name: createCareerDto.name },
        'FAILED TO CREATE CAREER',
        error.message,
      );
      if (error.code === '23505') {
        throw new ConflictException(`${RESOURCE_NAME_ALREADY_EXISTS}`);
      }
      handleInternalServerError(error.message);
    }
  }

  async findAll() {
    try {
      const careers = await this.careersRepository.find();
      return careers;
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }

  async findOne(id: string) {
    const career = await this.careersRepository.findOne({
      where: { id },
    });
    if (!career)
      throw new NotFoundException(`Career with id: ${id} not found.`);
    return career;
  }
  async update(
    id: string,
    updateCareerDto: UpdateCareerDto,
    reqUser: IRequestUser,
  ) {
    await this.findOne(id);
    try {
      const careerToUpdate = await this.careersRepository.preload({
        id,
        ...updateCareerDto,
      });
      const updatedCareer = await this.careersRepository.save(careerToUpdate);

      await this.systemAuditsService.createSystemAudit(
        {
          id: reqUser.userId,
          fullName: reqUser.fullName,
          role: reqUser.role,
        },
        'UPDATE CAREER',
        { id: updatedCareer.id, name: updatedCareer.name },
        'SUCCESS',
      );

      return updatedCareer;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        {
          id: reqUser.userId,
          fullName: reqUser.fullName,
          role: reqUser.role,
        },
        'TRY TO UPDATE CAREER',
        { id, name: 'Update Error' },
        'FAILED TO UPDATE CAREER',
        error.message,
      );
      if (error.code === '23505')
        throw new ConflictException(`${RESOURCE_NAME_ALREADY_EXISTS}`);
      handleInternalServerError(error.message);
    }
  }

  async remove(id: string, { fullName, role, userId }: IRequestUser) {
    try {
      const deletedCareer = await this.careersRepository.delete(id);
      if (!deletedCareer.affected)
        throw new NotFoundException(`Career with id: ${id} not found.`);

      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'DELETE CAREER',
        { id, name: 'Career' },
        'SUCCESS',
      );

      return deletedCareer.affected;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'TRY TO DELETE CAREER',
        { id, name: 'Career' },
        'FAILED TO DELETE CAREER',
        error.message,
      );
      handleInternalServerError(error.message);
    }
  }

  async removeAll() {
    try {
      // Obtener todos las carreras
      const allCareers = await this.careersRepository
        .createQueryBuilder('career')
        .leftJoinAndSelect('career.interns', 'intern')
        .getMany();

      // Filtrar instituciones sin relaciones activas (sin practicantes)
      const careersWithoutRelations = allCareers.filter(
        (c) => !c.interns.length,
      );

      if (careersWithoutRelations.length === 0)
        return 'No careers without relations to delete.';

      // Eliminar solo los departamentos sin relaciones
      const careers = careersWithoutRelations.map((c) => c.id);
      await this.careersRepository.delete(careers);

      return `Deleted careers without relations: ${careersWithoutRelations
        .map((c) => c.name)
        .join(', ')}`;
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }
}
