import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import type { AppDispatch } from "../../redux/store";
import { Grow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getNotificationsData, patchNotification } from "../../api/notifications/notifications.api";
import io, { Socket } from "socket.io-client";
import { setNotificationsLength } from "../../redux/auth-redux/profileSlice";
import { formatDateOther } from "../../functions/date-conversor.function";
import { NotificationDataObject } from "../../interfaces/notifications/notifications-menu/notification-menu.interface";

const socketEndpoint = (import.meta.env.VITE_API_KEY as string).replace("/api", "");
interface NotificationProps {
  anchorEl: boolean;
  onClose: () => void;
}

export const NotificationsMenu : React.FC<NotificationProps> = ({ anchorEl, onClose }) => {
  
    const [initialNotifications, setNotifications] = useState<NotificationDataObject[]>([]);
    const [showAll] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [disappearingNotification, setDisappearingNotification] = useState<string | null>(null);
    const userToken = sessionStorage.getItem("_Token") || "";
    let socket: Socket;
    const menuRef = useRef<HTMLDivElement>(null);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const fetchedData : any = await getNotificationsData(userToken);
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

    const markAsReadNotification = async (notificationId : string) => {
        setDisappearingNotification(notificationId);
        
        setTimeout(async () => {
            await patchNotification(userToken, notificationId);
            setNotifications((prev) =>
                prev.filter((notification) => notification.notification.id !== notificationId)
            );
            setDisappearingNotification(null);
            dispatch(setNotificationsLength(initialNotifications.length - 1));
        }, 300);
 
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

    const notificationsToShow = showAll ? initialNotifications : initialNotifications.slice(0, 4);

    const SeeMore = () => {
        navigate("/notifications");
    };

    const NotificationClick = (notification : NotificationDataObject) => {
        markAsReadNotification(notification.notification.id);
    };

    useEffect(() => {
        const ClickOutside = (event : MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", ClickOutside);
        return () => {
            document.removeEventListener("mousedown", ClickOutside);
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
                    <TransitionGroup component={null}>
                        {notificationsToShow.map((notification, index) => (
                            <CSSTransition
                                key={notification.notification.id}
                                timeout={300}
                                classNames="fade-notifications"
                            >
                                <div
                                    className="notification-item"
                                    onClick={() => NotificationClick(notification)}
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
                                                <strong>{notification.notification.notificationData.internFullName}</strong>
                                                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                                    <p>DEPARTAMENTO: </p>
                                                    {notification.notification.notificationData.internInternshipDepartment || ""}
                                                </div>
                                                <p>{notification.notification.notificationData.attendanceType || ""}</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
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
