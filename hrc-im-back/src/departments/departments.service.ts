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

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    try {
      const newDepartment =
        this.departmentRepository.create(createDepartmentDto);
      return await this.departmentRepository.save(newDepartment);
    } catch (error) {
      if (error.code === '23505')
        throw new ConflictException(`${RESOURCE_NAME_ALREADY_EXISTS}`);
      handleInternalServerError(error.message);
    }
  }

  async findAll() {
    try {
      const departments = await this.departmentRepository.find();
      return departments;
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }

  async findOne(id: string) {
    const department = await this.departmentRepository.findOne({
      where: { id },
    });
    if (!department) throw new NotFoundException('Department not found.');
    return department;
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    await this.findOne(id);
    try {
      const departmentToUpdate = await this.departmentRepository.preload({
        id,
        ...updateDepartmentDto,
      });
      return await this.departmentRepository.save(departmentToUpdate);
    } catch (error) {
      if (error.code === '23505')
        throw new ConflictException(`${RESOURCE_NAME_ALREADY_EXISTS}`);
      handleInternalServerError(error.message);
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    try {
      const deletedDepartment = await this.departmentRepository.delete(id);
      return deletedDepartment.affected;
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }

  async removeAll() {
    try {
      await this.departmentRepository.delete({});
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }
}
