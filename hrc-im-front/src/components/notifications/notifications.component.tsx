import { useEffect, useState } from "react";
import { NotificationsInterface } from "../../interfaces/notifications/notifications-menu/notification-menu.interface";
import { notifications } from "./notifications-menu.component";
import NotificationsCard from "./notifications-card.component";

export const NotificationsTable = () => {
    const [initialNotifications, setNotifications] = useState<NotificationsInterface[]>([]);

    useEffect(() => {
        const recibedNotifications = notifications();
    
        setNotifications(recibedNotifications);
      }, []);
    
    return (
       <div className="notifications-table">
        {initialNotifications.map((notification, index) => (
            <NotificationsCard key={index} type={notification.type} date={notification.date} color={notification.color} />
        ))}
       </div>
    );
} 