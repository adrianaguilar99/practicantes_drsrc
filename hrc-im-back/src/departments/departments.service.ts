import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Repository } from 'typeorm';
import { RESOURCE_NAME_ALREADY_EXISTS } from 'src/common/constants/constants';
import { handleInternalServerError } from 'src/common/utils';
import { SystemAuditsService } from 'src/system-audits/system-audits.service';
import { IRequestUser } from 'src/common/interfaces';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentsRepository: Repository<Department>,
    private readonly systemAuditsService: SystemAuditsService,
  ) {}

  async create(
    createDepartmentDto: CreateDepartmentDto,
    { fullName, role, userId }: IRequestUser,
  ) {
    try {
      const newDepartment =
        this.departmentsRepository.create(createDepartmentDto);

      const createdDepartment =
        await this.departmentsRepository.save(newDepartment);
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'CREATE DEPARTMENT',
        { id: createdDepartment.id, data: createdDepartment.name },
        'SUCCESS',
      );
      return createdDepartment;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'TRY TO CREATE DEPARTMENT',
        { id: null, data: createDepartmentDto.name },
        'FAILED TO CREATE DEPARTMENT',
        error.message,
      );
      if (error.code === '23505')
        throw new ConflictException(`${RESOURCE_NAME_ALREADY_EXISTS}`);
      handleInternalServerError(error.message);
    }
  }

  async findAll() {
    try {
      const allDepartments = await this.departmentsRepository.find({
        order: { createdAt: 'DESC' },
      });
      return allDepartments;
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }

  async findOne(id: string) {
    const department = await this.departmentsRepository.findOne({
      where: { id },
    });
    if (!department)
      throw new NotFoundException(`Department with id: ${id} not found.`);
    return department;
  }

  async update(
    id: string,
    updateDepartmentDto: UpdateDepartmentDto,
    { fullName, role, userId }: IRequestUser,
  ) {
    await this.findOne(id);
    try {
      const departmentToUpdate = await this.departmentsRepository.preload({
        id,
        ...updateDepartmentDto,
      });
      const updatedDepartment =
        await this.departmentsRepository.save(departmentToUpdate);
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'UPDATE DEPARTMENT',
        { id, data: updatedDepartment.name },
        'SUCCESS',
      );
      return updatedDepartment;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'TRY TO UPDATE DEPARTMENT',
        { id, data: `${updateDepartmentDto.name}` },
        'FAILED TO UPDATE DEPARTMENT',
        error.message,
      );
      if (error.code === '23505')
        throw new ConflictException(`${RESOURCE_NAME_ALREADY_EXISTS}`);
      handleInternalServerError(error.message);
    }
  }

  async remove(id: string, { fullName, role, userId }: IRequestUser) {
    const existingDepartment = await this.findOne(id);
    try {
      const deletedDepartment = await this.departmentsRepository.delete(id);
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'DELETE DEPARTMENT',
        { id, data: existingDepartment.name },
        'SUCCESS',
      );
      return deletedDepartment.affected;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'TRY TO DELETE DEPARTMENT',
        { id, data: existingDepartment.name },
        'FAILED TO DELETE DEPARTMENT',
        error.message,
      );
      handleInternalServerError(error.message);
    }
  }

  async removeAll({ fullName, role, userId }: IRequestUser) {
    try {
      // Obtener todos los departamentos
      const allDepartments = await this.departmentsRepository
        .createQueryBuilder('department')
        .leftJoinAndSelect('department.supervisors', 'supervisor')
        .leftJoinAndSelect('department.interns', 'intern')
        .getMany();

      // Filtrar departamentos sin relaciones activas (sin supervisores ni practicantes)
      const departmentsWithoutRelations = allDepartments.filter(
        (d) => !d.supervisors.length && !d.interns.length,
      );

      if (departmentsWithoutRelations.length === 0)
        return 'No departments without relations to delete.';

      // Eliminar solo los departamentos sin relaciones
      const departments = departmentsWithoutRelations.map((d) => d.id);
      await this.departmentsRepository.delete(departments);
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'DELETE ALL CAREERS',
        {
          id: departments.toString(),
          data: `${[...departmentsWithoutRelations]}`,
        },
        'SUCCESS',
      );
      return `Deleted departments without relations: ${departmentsWithoutRelations
        .map((d) => d.name)
        .join(', ')}`;
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }
}
