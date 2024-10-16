import { Module } from '@nestjs/common';
import { CareersService } from './careers.service';
import { CareersController } from './careers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Career } from './entities/career.entity';
import { SystemAudit } from 'src/system-audits/entities/system-audit.entity';
import { SystemAuditsService } from 'src/system-audits/system-audits.service';

@Module({
  imports: [TypeOrmModule.forFeature([Career, SystemAudit])],
  controllers: [CareersController],
  providers: [CareersService, SystemAuditsService],
})
export class CareersModule {}
