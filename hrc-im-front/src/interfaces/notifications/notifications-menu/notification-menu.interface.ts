
export interface NotificationsInterface {
  message: string;
  data:    DataNotification[];
  records: number;
}

export interface DataNotification {
  id:               string;
  notificationData: string;
  createdAt:        Date;
}


