import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store"; // Asegúrate de que la ruta sea la correcta
import { DataNotification, NotificationsInterface } from "../../interfaces/notifications/notifications-menu/notification-menu.interface";
import { Grow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getNotificationsData } from "../../api/notifications/notifications.api";
import io, { Socket } from "socket.io-client";
import { setNotificationsLength } from "../../redux/auth-redux/profileSlice";
import { formatDateOther } from "../../functions/date-conversor.function";

const socketEndpoint = (import.meta.env.VITE_API_KEY as string).replace("/api", "");

export interface NotificationsMenuProps {
  anchorEl: boolean;
}

export const NotificationsMenu: React.FC<NotificationsMenuProps> = ({ anchorEl }) => {
  const [initialNotifications, setNotifications] = useState<DataNotification[]>([]);
  const [showAll] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>(); 
  const [isLoading, setIsLoading] = useState(true); 
  const [hasError, setHasError] = useState(false);   
  const userToken = sessionStorage.getItem("_Token") || "";
  let socket: Socket;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const fetchedData: NotificationsInterface | null = await getNotificationsData(userToken);
      if (fetchedData && fetchedData.data.length > 0) {
        setNotifications(fetchedData.data);
        setHasError(false); 
        dispatch(setNotificationsLength(fetchedData.records)); 
      } else {
        setNotifications([]);
        setHasError(false);
        dispatch(setNotificationsLength(0)); 
      }
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    socket = io(socketEndpoint);
    socket.on('comment', fetchData);
    socket.on('attendance', fetchData);

    return () => {
      socket.off('comment', fetchData);
      socket.off('attendance', fetchData);
      socket.disconnect();
    };
  }, [userToken]);

  const notificationsToShow = showAll ? initialNotifications : initialNotifications.slice(0, 4);

  const SeeMore = () => {
    navigate('/notifications'); 
  };

  return (
    <Grow in={Boolean(anchorEl)}>
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
               <div className="notification-date">
                <p>{formatDateOther(notification.createdAt.toString())}</p>
              </div>
              <div className="notification-type">
                <strong>{notification.notificationData}</strong>
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
    </Grow>
  );
};
