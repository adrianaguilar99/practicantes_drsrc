import { useEffect, useState } from "react";
import { NotificationDataObject } from "../../interfaces/notifications/notifications-menu/notification-menu.interface";
import NotificationsCard from "./notifications-card.component";


interface NotificationTableProps {
    data: NotificationDataObject[];
}
export const NotificationsTable: React.FC<NotificationTableProps> = ({data}) => {

    return (
        <div>
    <div className="notifications-table-main-container">
          <div className="notification-header">

         <h6>Tipo de notificación</h6>
         <h6>Descripción</h6>
         <h6>Fecha y hora</h6>
              </div>
              <div className="notifications-table">
      
      {data.map((notification, index) => (
          <NotificationsCard key={index} data={notification.notification} />
      ))}
     </div>
            </div>
         
     </div>

        
   
    );
} 