import { Module } from '@nestjs/common';
import { EmergencyContactService } from './emergency-contact.service';
import { EmergencyContactController } from './emergency-contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmergencyContact } from './entities/emergency-contact.entity';
import { InternsService } from 'src/interns/interns.service';
import { SystemAuditsService } from 'src/system-audits/system-audits.service';
import { Intern } from 'src/interns/entities/intern.entity';
import { Career } from 'src/careers/entities/career.entity';
import { Department } from 'src/departments/entities/department.entity';
import { CareersService } from 'src/careers/careers.service';
import { DepartmentsService } from 'src/departments/departments.service';
import { InstitutionsService } from 'src/institutions/institutions.service';
import { PropertiesService } from 'src/properties/properties.service';
import { SupervisorsService } from 'src/supervisors/supervisors.service';
import { UsersService } from 'src/users/users.service';
import { Institution } from 'src/institutions/entities/institution.entity';
import { Property } from 'src/properties/entities/property.entity';
import { Supervisor } from 'src/supervisors/entities/supervisor.entity';
import { User } from 'src/users/entities/user.entity';
import { SystemAudit } from 'src/system-audits/entities/system-audit.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EmergencyContact,
      Intern,
      Career,
      Department,
      Institution,
      Property,
      Supervisor,
      User,
      SystemAudit,
    ]),
  ],
  controllers: [EmergencyContactController],
  providers: [
    EmergencyContactService,
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
export class EmergencyContactModule {}
