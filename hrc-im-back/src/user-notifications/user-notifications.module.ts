import { Module } from '@nestjs/common';
import { UserNotificationsGateway } from './user-notifications.gateway';

@Module({
  providers: [UserNotificationsGateway]
})
export class UserNotificationsModule {}
