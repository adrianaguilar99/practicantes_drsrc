import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { Grow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getNotificationsData, patchNotification } from "../../api/notifications/notifications.api";
import io, { Socket } from "socket.io-client";
import { setNotificationsLength } from "../../redux/auth-redux/profileSlice";
import { formatDateOther } from "../../functions/date-conversor.function";
import { NotificationDataObject } from "../../interfaces/notifications/notifications-menu/notification-menu.interface";

const socketEndpoint = (import.meta.env.VITE_API_KEY as string).replace(
  "/api",
  ""
);

export interface NotificationsMenuProps {
  anchorEl: boolean;
  onClose: () => void; 
}

export const NotificationsMenu: React.FC<NotificationsMenuProps> = ({
  anchorEl,
  onClose,
}) => {
  const [initialNotifications, setNotifications] = useState<NotificationDataObject[]>([]);
  const [showAll] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [selectNotification, setSelectNotification] = useState("");
  const [disappearingNotification, setDisappearingNotification] = useState<string | null>(null);
  const userToken = sessionStorage.getItem("_Token") || "";
  let socket: Socket;

  // Crea una referencia para el menú de notificaciones
  const menuRef = useRef<HTMLDivElement>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const fetchedData = await getNotificationsData(userToken);
      if (fetchedData && fetchedData.data.length > 0) {
        setNotifications(fetchedData.data);
        dispatch(setNotificationsLength(fetchedData.records));
        setHasError(false);
      } else {
        setNotifications([]);
        dispatch(setNotificationsLength(0));
        setHasError(false);
      }
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsReadNotification = async (notificationId: string) => {
    setDisappearingNotification(notificationId);
    setTimeout(async () => {
      await patchNotification(userToken, notificationId);
      fetchData();
      setDisappearingNotification(null);
    }, 300); // Tiempo para la animación
  };

  useEffect(() => {
    fetchData();
    socket = io(socketEndpoint);
    socket.on("comment", fetchData);
    socket.on("attendance", fetchData);

    return () => {
      socket.off("comment", fetchData);
      socket.off("attendance", fetchData);
      socket.disconnect();
    };
  }, [userToken]);

  const notificationsToShow = showAll
    ? initialNotifications
    : initialNotifications.slice(0, 4);

  const SeeMore = () => {
    navigate("/notifications");
  };

  const handleNotificationClick = (notification: NotificationDataObject) => {
    setSelectNotification(notification.notification.id);
    markAsReadNotification(notification.notification.id);
  };

  // Cierra el menú si el usuario hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();  // Llama a la función onClose pasada por las props
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <Grow in={Boolean(anchorEl)}>
      <div ref={menuRef} className="notifications-menu">
        <div className="notifications-header">
          <h6>Notificaciones</h6>
        </div>
        <div className="notifications-list">
          {initialNotifications.length === 0 && (
            <p className="no-notification">No tienes nuevas notificaciones</p>
          )}
          {notificationsToShow.map((notification, index) => (
            <div
              key={index}
              className={`notification-item ${disappearingNotification === notification.notification.id ? "fade-out-right" : ""}`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="notification-date">
                <p>{typeof notification.notification.notificationData === "string" ? "Comentario" : "Asistencia"}</p>
                <p>{formatDateOther(notification.notification.createdAt.toString())}</p>
              </div>
              <div className="notification-type">
                {typeof notification.notification.notificationData === "string" ? (
                  <strong>{notification.notification.notificationData}</strong>
                ) : (
                  <>
                    <strong>
                      {notification.notification.notificationData.internFullName}
                    </strong>{" "}
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <p>DEPARTAMENTO: </p>
                      {notification.notification.notificationData.internInternshipDepartment || ""}
                    </div>
                    <p>{notification.notification.notificationData.attendanceType || ""}</p>
                  </>
                )}
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
