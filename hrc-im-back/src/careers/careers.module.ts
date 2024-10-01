import { Module } from '@nestjs/common';
import { CareersService } from './careers.service';
import { CareersController } from './careers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Career } from './entities/career.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { SystemAudit } from 'src/system-audits/entities/system-audit.entity';
import { SystemAuditsService } from 'src/system-audits/system-audits.service';

@Module({
  imports: [TypeOrmModule.forFeature([Career, User, SystemAudit])],
  controllers: [CareersController],
  providers: [CareersService, UsersService, SystemAuditsService],
})
export class CareersModule {}
