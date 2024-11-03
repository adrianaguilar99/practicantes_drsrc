import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserNotification } from './user-notification.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('user_notification_status')
export class UserNotificationStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.notificationStatuses)
  user: User;

  @ManyToOne(
    () => UserNotification,
    (notification) => notification.userStatuses,
  )
  notification: UserNotification;

  @Column({ type: 'boolean', default: false })
  seen: boolean;
}
