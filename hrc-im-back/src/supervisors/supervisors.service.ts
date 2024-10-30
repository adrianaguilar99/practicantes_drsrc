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
    const user = await this.usersService.findOne(createSupervisorDto.userId);
    if (
      user.userRole !== UserRole.SUPERVISOR &&
      user.userRole !== UserRole.SUPERVISOR_RH
    ) {
      throw new ConflictException(
        `User with ID ${createSupervisorDto.userId} does not have the required role to be a supervisor.`,
      );
    }

    const department = await this.departmentsService.findOne(
      createSupervisorDto.departmentId,
    );

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
          data: `${createdSupervisor.user.firstName} ${createdSupervisor.user.lastName}`,
        },
        'SUCCESS',
      );
      return createdSupervisor;
    } catch (error) {
      await this.usersService.physicalRemove(user.id, {
        fullName,
        role,
        userId,
      });
      await this.usersService.physicalRemove(user.id, {
        fullName,
        role,
        userId,
      });
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'TRY TO CREATE SUPERVISOR',
        { id: null, data: `${user.firstName} ${user.lastName}` },
        'FAILED TO CREATE SUPERVISOR',
        error.message,
      );
      handleInternalServerError(error.message);
    }
  }

  async findAll() {
    try {
      const allSupervisors = await this.supervisorsRepository.find({
        relations: {
          department: true,
        },
      });
      const withoutExtraSupervisor = allSupervisors.map((data) => {
        const { supervisors, interns, ...department } = data.department;
        return { ...data, department };
      });
      return withoutExtraSupervisor;
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }

  async findOne(id: string) {
    const supervisor = await this.supervisorsRepository.findOne({
      where: { id },
      relations: {
        department: true,
      },
    });
    if (!supervisor)
      throw new NotFoundException(`Supervisor with id: ${id} not found.`);

    const { supervisors, interns, ...department } = supervisor.department;
    return { ...supervisor, department };
  }

  async findByUser(id: string) {
    const supervisor = await this.supervisorsRepository.findOne({
      where: { user: { id } },
      relations: {
        department: true,
      },
    });
    if (!supervisor)
      throw new NotFoundException(`Supervisor not found using user.`);
    const { supervisors, interns, ...department } = supervisor.department;

    return { ...supervisor, department };
  }

  async update(
    id: string,
    { phone }: UpdateSupervisorDto,
    { fullName, role, userId }: IRequestUser,
  ) {
    const existingSupervisor = await this.findOne(id);
    try {
      existingSupervisor.phone = phone ?? existingSupervisor.phone;
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
          id,
          data: `${updatedSupervisor.user.firstName} ${updatedSupervisor.user.lastName}`,
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
        {
          id,
          data: `${existingSupervisor.user.firstName} ${existingSupervisor.user.lastName}`,
        },
        'FAILED TO UPDATE SUPERVISOR',
        error.message,
      );
      handleInternalServerError(error.message);
    }
  }

  async remove(id: string, { fullName, role, userId }: IRequestUser) {
    const existingSupervisor = await this.findOne(id);
    try {
      const deletedSupervisor = await this.supervisorsRepository.delete(id);
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'DELETE SUPERVISOR',
        {
          id,
          data: `${existingSupervisor.user.firstName} ${existingSupervisor.user.lastName}`,
        },
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
        {
          id,
          data: `${existingSupervisor.user.firstName} ${existingSupervisor.user.lastName}`,
        },
        'FAILED TO DELETE SUPERVISOR',
        error.message,
      );
      handleInternalServerError(error.message);
    }
  }
}
