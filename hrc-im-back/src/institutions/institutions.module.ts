import { Module } from '@nestjs/common';
import { InstitutionsService } from './institutions.service';
import { InstitutionsController } from './institutions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institution } from './entities/institution.entity';
import { SystemAudit } from 'src/system-audits/entities/system-audit.entity';
import { SystemAuditsService } from 'src/system-audits/system-audits.service';

@Module({
  imports: [TypeOrmModule.forFeature([Institution, SystemAudit])],
  controllers: [InstitutionsController],
  providers: [InstitutionsService, SystemAuditsService],
})
export class InstitutionsModule {}
