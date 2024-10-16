import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { SystemAuditsService } from 'src/system-audits/system-audits.service';
import { SystemAudit } from 'src/system-audits/entities/system-audit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department, SystemAudit])],
  controllers: [DepartmentsController],
  providers: [DepartmentsService, SystemAuditsService],
})
export class DepartmentsModule {}
