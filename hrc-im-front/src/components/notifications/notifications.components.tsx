import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react"
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import { NotificationsMenuProps } from "../../interfaces/notifications/notifications-menu/notification-menu.interface";
import { Fade } from "@mui/material";


export const notifications = [
    {
      type: "ENTRADA",
      date: "05 de septiembre a las 08:55 a. m.",
      color: "green",
    },
    {
      type: "SALIDA",
      date: "05 de septiembre a las 17:00 p. m.",
      color: "green",
    },
    {
      type: "RETARDO",
      date: "06 de septiembre a las 09:45 a. m.",
      color: "orange",
    },
    {
      type: "SALIDA",
      date: "07 de septiembre a las 17:00 p. m.",
      color: "green",
    },
    {
      type: "ENTRADA",
      date: "08 de septiembre a las 08:55 a. m.",
      color: "green",
    },
    {
      type: "SALIDA",
      date: "05 de septiembre a las 17:00 p. m.",
      color: "green",
    },
    {
      type: "SALIDA",
      date: "05 de septiembre a las 17:00 p. m.",
      color: "green",
    },
    {
      type: "SALIDA",
      date: "05 de septiembre a las 17:00 p. m.",
      color: "green",
    },
    {
      type: "SALIDA",
      date: "05 de septiembre a las 17:00 p. m.",
      color: "green",
    },
  ];
  export const NotificationsMenu: React.FC<NotificationsMenuProps> = ({ anchorEl }) => {
    const [initialNotifications, setNotifications] = useState(notifications);

    return (
        <Fade in={anchorEl}>
 <div className="notifications-menu" >
            <div className="notifications-header">
                <h6>Notificaciones</h6>
            </div>
            <div className="notifications-list">
                {initialNotifications.map((notification, index) => (
                    <div className="notification-item" key={index}>
                        <div className="notification-type">
                            <strong>{notification.type}</strong>
                        </div>
                        <div className="notification-icon">
                            {notification.color === "green" && <CheckCircleIcon style={{ color: '#4CAF50' }} />}
                            {notification.color === "orange" && <InfoIcon style={{ color: '#FF9800' }} />}
                            {notification.color === "red" && <CloseIcon style={{ color: '#F44336' }} />}
                        </div>
                        <div className="notification-date">
                            <p>{notification.date}</p>
                        </div>
                        <div className="notification-close">
                            <CloseIcon />
                        </div>
                    </div>
                ))}
            </div>
            <button className="see-more-button">Ver más</button>
        </div>
        </Fade>
       
    );
}