import { Module } from '@nestjs/common';
import { InternFilesService } from './intern-files.service';
import { InternFilesController } from './intern-files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternFile } from './entities/intern-file.entity';
import { Intern } from 'src/interns/entities/intern.entity';
import { Career } from 'src/careers/entities/career.entity';
import { Department } from 'src/departments/entities/department.entity';
import { Institution } from 'src/institutions/entities/institution.entity';
import { Property } from 'src/properties/entities/property.entity';
import { Supervisor } from 'src/supervisors/entities/supervisor.entity';
import { User } from 'src/users/entities/user.entity';
import { InternsService } from 'src/interns/interns.service';
import { SystemAudit } from 'src/system-audits/entities/system-audit.entity';
import { CareersService } from 'src/careers/careers.service';
import { DepartmentsService } from 'src/departments/departments.service';
import { InstitutionsService } from 'src/institutions/institutions.service';
import { PropertiesService } from 'src/properties/properties.service';
import { SupervisorsService } from 'src/supervisors/supervisors.service';
import { UsersService } from 'src/users/users.service';
import { SystemAuditsService } from 'src/system-audits/system-audits.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InternFile,
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
  controllers: [InternFilesController],
  providers: [
    InternFilesService,
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
export class InternFilesModule {}
