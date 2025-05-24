import { Module } from '@nestjs/common';
import { SupervisorsService } from './supervisors.service';
import { SupervisorsController } from './supervisors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supervisor } from './entities/supervisor.entity';
import { SystemAudit } from 'src/system-audits/entities/system-audit.entity';
import { SystemAuditsService } from 'src/system-audits/system-audits.service';
import { Department } from 'src/departments/entities/department.entity';
import { User } from 'src/users/entities/user.entity';
import { DepartmentsService } from 'src/departments/departments.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Supervisor, SystemAudit, Department, User])],
  controllers: [SupervisorsController],
  providers: [SupervisorsService, SystemAuditsService, DepartmentsService, UsersService],
})
export class SupervisorsModule {}
