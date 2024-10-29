import { Module } from '@nestjs/common';
import { InternCommentsService } from './intern-comments.service';
import { InternCommentsController } from './intern-comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternComment } from './entities/intern-comment.entity';
import { Intern } from 'src/interns/entities/intern.entity';
import { Career } from 'src/careers/entities/career.entity';
import { Supervisor } from 'src/supervisors/entities/supervisor.entity';
import { SystemAudit } from 'src/system-audits/entities/system-audit.entity';
import { InternsService } from 'src/interns/interns.service';
import { SystemAuditsService } from 'src/system-audits/system-audits.service';
import { SupervisorsService } from 'src/supervisors/supervisors.service';
import { CareersService } from 'src/careers/careers.service';
import { DepartmentsService } from 'src/departments/departments.service';
import { InstitutionsService } from 'src/institutions/institutions.service';
import { PropertiesService } from 'src/properties/properties.service';
import { UsersService } from 'src/users/users.service';
import { Institution } from 'src/institutions/entities/institution.entity';
import { Department } from 'src/departments/entities/department.entity';
import { Property } from 'src/properties/entities/property.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InternComment,
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
  controllers: [InternCommentsController],
  providers: [
    InternCommentsService,
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
export class InternCommentsModule {}
