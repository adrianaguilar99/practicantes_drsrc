import { Module } from '@nestjs/common';
import { InternReportsService } from './intern-reports.service';
import { InternReportsController } from './intern-reports.controller';
import { PdfPrinterModule } from 'src/pdf-printer/pdf-printer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternsService } from 'src/interns/interns.service';
import { CareersService } from 'src/careers/careers.service';
import { DepartmentsService } from 'src/departments/departments.service';
import { InstitutionsService } from 'src/institutions/institutions.service';
import { PropertiesService } from 'src/properties/properties.service';
import { SupervisorsService } from 'src/supervisors/supervisors.service';
import { SystemAuditsService } from 'src/system-audits/system-audits.service';
import { UsersService } from 'src/users/users.service';
import { Intern } from 'src/interns/entities/intern.entity';
import { Career } from 'src/careers/entities/career.entity';
import { Department } from 'src/departments/entities/department.entity';
import { Institution } from 'src/institutions/entities/institution.entity';
import { Property } from 'src/properties/entities/property.entity';
import { Supervisor } from 'src/supervisors/entities/supervisor.entity';
import { SystemAudit } from 'src/system-audits/entities/system-audit.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  controllers: [InternReportsController],
  providers: [
    InternReportsService,
    InternsService,
    CareersService,
    DepartmentsService,
    InstitutionsService,
    PropertiesService,
    SupervisorsService,
    SystemAuditsService,
    UsersService,
  ],
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
    PdfPrinterModule,
  ],
})
export class InternReportsModule {}
