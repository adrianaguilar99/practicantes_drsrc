import { Module } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { SystemAudit } from 'src/system-audits/entities/system-audit.entity';
import { SystemAuditsService } from 'src/system-audits/system-audits.service';

@Module({
  imports: [TypeOrmModule.forFeature([Property, SystemAudit])],
  controllers: [PropertiesController],
  providers: [PropertiesService, SystemAuditsService],
})
export class PropertiesModule {}
