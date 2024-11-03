import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserNotification } from './entities/user-notification.entity';
import { Repository } from 'typeorm';
import { handleInternalServerError } from 'src/common/utils';
import { UserNotificationStatus } from './entities/user-notification-status.entity';
import { IRequestUser } from 'src/common/interfaces';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UserNotificationsService {
  constructor(
    @InjectRepository(UserNotification)
    private readonly userNotificationsRepository: Repository<UserNotification>,
    @InjectRepository(UserNotificationStatus)
    private readonly userNotificationStatusRepository: Repository<UserNotificationStatus>,
  ) {}

  async createNotification(data: any, recipients: User[]) {
    const notification = this.userNotificationsRepository.create({
      notificationData: data,
      createdAt: new Date().toISOString(),
    });
    try {
      await this.userNotificationsRepository.save(notification);
    } catch (error) {
      handleInternalServerError(error.message);
    }

    for (const user of recipients) {
      const userNotificationStatus =
        this.userNotificationStatusRepository.create({
          notification,
          user,
          seen: false,
        });
      try {
        await this.userNotificationStatusRepository.save(
          userNotificationStatus,
        );
      } catch (error) {
        handleInternalServerError(error.message);
      }
    }
  }

  async findAll() {
    try {
      const allUserNotifications = await this.userNotificationsRepository.find({
        order: { createdAt: 'DESC' },
      });
      return allUserNotifications;
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const userNotification = await this.userNotificationsRepository.findOne({
        where: { id },
      });
      if (!userNotification)
        throw new NotFoundException(`Notification with id: ${id} not found`);
      return userNotification;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      handleInternalServerError(error.message);
    }
  }

  async markAsRead(id: string, { userId }: IRequestUser) {
    const userNotificationStatus =
      await this.userNotificationStatusRepository.findOne({
        where: { notification: { id }, user: { id: userId } },
      });
    if (userNotificationStatus) {
      userNotificationStatus.seen = true;
      await this.userNotificationStatusRepository.save(userNotificationStatus);
    }
  }
}
