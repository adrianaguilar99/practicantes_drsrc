import { Module } from '@nestjs/common';
import { SystemAuditsService } from './system-audits.service';
import { SystemAuditsController } from './system-audits.controller';
import { SystemAudit } from './entities/system-audit.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SystemAudit])],
  controllers: [SystemAuditsController],
  providers: [SystemAuditsService],
})
export class SystemAuditsModule {}
