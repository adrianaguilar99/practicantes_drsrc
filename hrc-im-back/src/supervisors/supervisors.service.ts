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
import { UserRole } from 'src/common/enums';

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
    if (
      user.userRole !== UserRole.SUPERVISOR &&
      user.userRole !== UserRole.SUPERVISOR_RH
    ) {
      throw new ConflictException(
        `User with ID ${createSupervisorDto.userId} does not have the required role to be a supervisor.`,
      );
    }

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
        'TRY TO CREATE SUPERVISOR',
        { id: null, name: `${user.firstName} ${user.lastName}` },
        'FAILED TO CREATE SUPERVISOR',
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
    const existingSupervisor = await this.findOne(id);
    const isUnauthorizedUpdate =
      (updateSupervisorDto.departmentId &&
        updateSupervisorDto.departmentId !==
          existingSupervisor.department.id) ||
      (updateSupervisorDto.userId &&
        updateSupervisorDto.userId !== existingSupervisor.user.id);

    if (isUnauthorizedUpdate) {
      await this.systemAuditsService.createSystemAudit(
        { id: userId, fullName, role },
        'TRY TO UPDATE SUPERVISOR',
        {
          id: existingSupervisor.id,
          name: `${existingSupervisor.user.firstName} ${existingSupervisor.user.lastName}`,
        },
        'FAILED TO UPDATE SUPERVISOR',
        'Attempted to update fields that are not allowed: departmentId or userId',
      );
      throw new ConflictException(
        'You are not allowed to update the department or user of the supervisor.',
      );
    }
    try {
      existingSupervisor.phone =
        updateSupervisorDto.phone ?? existingSupervisor.phone;
      const updatedSupervisor =
        await this.supervisorsRepository.save(existingSupervisor);
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
      const response = {
        id: updatedSupervisor.id,
        phone: updatedSupervisor.phone,
        department: {
          id: updatedSupervisor.department.id,
          name: updatedSupervisor.department.name,
        },
        user: {
          id: updatedSupervisor.user.id,
          firstName: updatedSupervisor.user.firstName,
          lastName: updatedSupervisor.user.lastName,
          email: updatedSupervisor.user.email,
          userRole: updatedSupervisor.user.userRole,
          createdAt: updatedSupervisor.user.createdAt,
          isActive: updatedSupervisor.user.isActive,
        },
      };
      return response;
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
