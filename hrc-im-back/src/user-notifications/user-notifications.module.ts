import { Module } from '@nestjs/common';
import { UserNotificationsGateway } from './user-notifications.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserNotification } from './entities/user-notification.entity';
import { UserNotificationsController } from './user-notifications.controller';
import { UserNotificationsService } from './user-notifications.service';
import { UserNotificationStatus } from './entities/user-notification-status.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { SystemAudit } from 'src/system-audits/entities/system-audit.entity';
import { SystemAuditsService } from 'src/system-audits/system-audits.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserNotification,
      UserNotificationStatus,
      User,
      SystemAudit,
    ]),
  ],
  providers: [
    UserNotificationsGateway,
    UserNotificationsService,
    UsersService,
    SystemAuditsService,
  ],
  controllers: [UserNotificationsController],
})
export class UserNotificationsModule {}
