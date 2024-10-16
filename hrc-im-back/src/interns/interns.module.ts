import { Module } from '@nestjs/common';
import { InternsService } from './interns.service';
import { InternsController } from './interns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Intern } from './entities/intern.entity';
import { DepartmentsService } from 'src/departments/departments.service';
import { UsersService } from 'src/users/users.service';
import { SystemAuditsService } from 'src/system-audits/system-audits.service';
import { Department } from 'src/departments/entities/department.entity';
import { User } from 'src/users/entities/user.entity';
import { SystemAudit } from 'src/system-audits/entities/system-audit.entity';
import { CareersService } from 'src/careers/careers.service';
import { Career } from 'src/careers/entities/career.entity';
import { InstitutionsService } from 'src/institutions/institutions.service';
import { Institution } from 'src/institutions/entities/institution.entity';
import { Property } from 'src/properties/entities/property.entity';
import { PropertiesService } from 'src/properties/properties.service';
import { Supervisor } from 'src/supervisors/entities/supervisor.entity';
import { SupervisorsService } from 'src/supervisors/supervisors.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Intern,
      Career,
      Department,
      Institution,
      Property,
      Supervisor,
      SystemAudit,
      User,
    ]),
  ],
  controllers: [InternsController],
  providers: [
    InternsService,
    CareersService,
    DepartmentsService,
    InstitutionsService,
    PropertiesService,
    SupervisorsService,
    SystemAuditsService,
    UsersService,
  ],
})
export class InternsModule {}
