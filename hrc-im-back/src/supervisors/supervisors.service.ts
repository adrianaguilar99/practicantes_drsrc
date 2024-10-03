import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSupervisorDto } from './dto/create-supervisor.dto';
import { UpdateSupervisorDto } from './dto/update-supervisor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Supervisor } from './entities/supervisor.entity';
import { Repository } from 'typeorm';
import { SystemAuditsService } from 'src/system-audits/system-audits.service';
import { IRequestUser } from 'src/common/interfaces';
import { DepartmentsService } from 'src/departments/departments.service';
import { UsersService } from 'src/users/users.service';
import { handleInternalServerError } from 'src/common/utils';

@Injectable()
export class SupervisorsService {
  constructor(
    @InjectRepository(Supervisor)
    private readonly supervisorsRepository: Repository<Supervisor>,
    private readonly departmentsService: DepartmentsService,
    private readonly usersService: UsersService,
    private readonly systemAuditsService: SystemAuditsService,
  ) {}

  async create(
    createSupervisorDto: CreateSupervisorDto,
    { fullName, role, userId }: IRequestUser,
  ) {
    const department = await this.departmentsService.findOne(
      createSupervisorDto.departmentId,
    );
    const user = await this.usersService.findOne(createSupervisorDto.userId);

    const existingSupervisor = await this.supervisorsRepository.findOne({
      where: { user },
    });
    if (existingSupervisor) {
      throw new ConflictException(
        `User with ID ${createSupervisorDto.userId} is already associated with a supervisor.`,
      );
    }

    const newSupervisor = this.supervisorsRepository.create({
      phone: createSupervisorDto.phone,
      department,
      user,
    });
    try {
      const createdSupervisor =
        await this.supervisorsRepository.save(newSupervisor);
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'CREATE SUPERVISOR',
        {
          id: createdSupervisor.id,
          name: `${createdSupervisor.user.firstName} ${createdSupervisor.user.lastName}`,
        },
        'SUCCESS',
      );
      return createdSupervisor;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'TRY TO CREATE PROPERTY',
        { id: null, name: `${createSupervisorDto}` },
        'FAILED TO CREATE PROPERTY',
        error.message,
      );
    }
  }

  async findAll() {
    try {
      const allSupervisors = await this.supervisorsRepository.find();
      return allSupervisors;
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }

  async findOne(id: string) {
    const supervisor = await this.supervisorsRepository.findOne({
      where: { id },
    });
    if (!supervisor)
      throw new NotFoundException(`Supervisor with id: ${id} not found.`);
    return supervisor;
  }

  async update(
    id: string,
    updateSupervisorDto: UpdateSupervisorDto,
    { fullName, role, userId }: IRequestUser,
  ) {
    await this.findOne(id);
    try {
      const supervisorToUpdate = await this.supervisorsRepository.preload({
        id,
        ...updateSupervisorDto,
      });
      const updatedSupervisor =
        await this.supervisorsRepository.save(supervisorToUpdate);
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'UPDATE SUPERVISOR',
        {
          id: updatedSupervisor.id,
          name: `${updatedSupervisor.user.firstName} ${updatedSupervisor.user.lastName}`,
        },
        'SUCCESS',
      );
      return updatedSupervisor;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'TRY TO UPDATE SUPERVISOR',
        { id, name: 'Update Error' },
        'FAILED TO UPDATE SUPERVISOR',
        error.message,
      );
      handleInternalServerError(error.message);
    }
  }

  async remove(id: string, { fullName, role, userId }: IRequestUser) {
    await this.findOne(id);
    try {
      const deletedSupervisor = await this.supervisorsRepository.delete(id);
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'DELETE SUPERVISOR',
        { id, name: 'Supervisor' },
        'SUCCESS',
      );
      return deletedSupervisor.affected;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'TRY TO DELETE SUPERVISOR',
        { id, name: 'Supervisor' },
        'FAILED TO DELETE SUPERVISOR',
        error.message,
      );
      handleInternalServerError(error.message);
    }
  }
}
