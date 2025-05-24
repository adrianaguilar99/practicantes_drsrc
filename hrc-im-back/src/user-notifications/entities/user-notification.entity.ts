import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserNotificationStatus } from './user-notification-status.entity';

@Entity('user_notifications')
export class UserNotification {
  @ApiProperty({
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'User notification ID',
    uniqueItems: true,
    nullable: false,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Data related to the notification',
    type: 'object',
    nullable: false,
  })
  @Column({
    name: 'notification_data',
    type: 'json',
    nullable: false,
  })
  notificationData: any;

  @ApiProperty({
    description: 'Date when the notification was created',
    example: '2023-11-01T10:00:00.000Z',
  })
  @Column({
    name: 'created_at',
    type: 'varchar',
  })
  createdAt: string;

  @ApiProperty({
    type: () => User,
    description: 'ID of the user who created the notification',
    example: 'd4b8b9d2-4a4e-4f88-8e56-df5e0a5d9f4b',
  })
  @OneToMany(() => UserNotificationStatus, (status) => status.notification, {
    cascade: true,
  })
  userStatuses: UserNotificationStatus[];
}
