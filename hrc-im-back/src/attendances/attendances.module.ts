import { Module } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { AttendancesController } from './attendances.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { InternsService } from 'src/interns/interns.service';
import { SystemAuditsService } from 'src/system-audits/system-audits.service';
import { Intern } from 'src/interns/entities/intern.entity';
import { Career } from 'src/careers/entities/career.entity';
import { CareersService } from 'src/careers/careers.service';
import { Department } from 'src/departments/entities/department.entity';
import { DepartmentsService } from 'src/departments/departments.service';
import { Institution } from 'src/institutions/entities/institution.entity';
import { InstitutionsService } from 'src/institutions/institutions.service';
import { Property } from 'src/properties/entities/property.entity';
import { PropertiesService } from 'src/properties/properties.service';
import { Supervisor } from 'src/supervisors/entities/supervisor.entity';
import { SupervisorsService } from 'src/supervisors/supervisors.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { SystemAudit } from 'src/system-audits/entities/system-audit.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Attendance,
      Intern,
      Career,
      Department,
      Institution,
      Supervisor,
      Property,
      SystemAudit,
      User,
    ]),
  ],
  controllers: [AttendancesController],
  providers: [
    AttendancesService,
    InternsService,
    CareersService,
    DepartmentsService,
    InstitutionsService,
    PropertiesService,
    SupervisorsService,
    UsersService,
    SystemAuditsService,
  ],
})
export class AttendancesModule {}
