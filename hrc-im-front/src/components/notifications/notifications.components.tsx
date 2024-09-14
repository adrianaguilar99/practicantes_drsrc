import {
  useEffect,
  useState,
} from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import {
  NotificationsInterface,
  NotificationsMenuProps,
} from "../../interfaces/notifications/notifications-menu/notification-menu.interface";
import { Fade } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const notifications = (): NotificationsInterface[] => {
  return [
      {
        type: "ENTRADA",
        date: "05 de septiembre a las 08:55 a. m.",
        color: "green",
      },



  ];
};
export const NotificationsMenu: React.FC<NotificationsMenuProps> = ({anchorEl,}) => {
  const [initialNotifications, setNotifications] = useState<NotificationsInterface[]>([]);
  const [showAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const recibedNotifications = notifications();

    setNotifications(recibedNotifications);
  }, []);

  const notificationsToShow = showAll
    ? initialNotifications
    : initialNotifications.slice(0, 4);

    const SeeMore = () => {
      navigate('/notificaciones'); 
    };

  return (
    <Fade in={Boolean(anchorEl)}>
      <div className="notifications-menu">
        <div className="notifications-header">
          <h6>Notificaciones</h6>
        </div>
        <div className="notifications-list">
          {initialNotifications.length === 0 && (
            <p className="no-notification">No tienes nuevas notificaciones</p>
          )}
          {notificationsToShow.map((notification, index) => (
            <div className="notification-item" key={index}>
              <div className="notification-type">
                <strong>{notification.type}</strong>
              </div>
              <div className="notification-icon">
                {notification.color === "green" && (
                  <CheckCircleIcon style={{ color: "#4CAF50" }} />
                )}
                {notification.color === "orange" && (
                  <InfoIcon style={{ color: "#FF9800" }} />
                )}
                {notification.color === "red" && (
                  <CloseIcon style={{ color: "#F44336" }} />
                )}
              </div>
              <div className="notification-date">
                <p>{notification.date}</p>
              </div>
              <div className="notification-close">
                <CloseIcon style={{ cursor: "pointer", color: "#757575" }} />
              </div>
            </div>
          ))}
        </div>
        {!showAll && initialNotifications.length > 4 && (
  <button className="see-more-button" onClick={SeeMore}>
    Ver más
  </button>
)}
      </div>
    </Fade>
  );
};
