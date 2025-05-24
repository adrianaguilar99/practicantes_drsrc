import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { SystemAudit } from 'src/system-audits/entities/system-audit.entity';
import { SystemAuditsService } from 'src/system-audits/system-audits.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, SystemAudit])],
  controllers: [UsersController],
  providers: [UsersService, SystemAuditsService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
