
export interface NotificationsInterface {
  message: string;
  data:    NotificationDataObject[];
  records: number;
}

export interface NotificationDataObject{
  id: string,
  seen: boolean,
  notification : DataNotification
}

export interface DataNotification {
  id:               string;
  notificationData: string | NotificationDataObject;
  createdAt:        Date;
}

export interface NotificationDataObject {
  internFullName: string;
  internInternshipDepartment: string;
  attendanceType: string;
  notificationDate: string; 
}



