import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import CancelIcon from "@mui/icons-material/Cancel";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { DataNotification } from "../../interfaces/notifications/notifications-menu/notification-menu.interface";
import { formatDateOther } from "../../functions/date-conversor.function";

interface NotificationsCardProps {
  key : number
 data: DataNotification
}

const NotificationsCard: React.FC<NotificationsCardProps> = ({
  key,
  data
}) => {
  return (
    <div className="notification-card" key={key}>
    <div className="notification-title">
      {typeof data.notificationData === "string" ? (
        <p>COMENTARIO</p>
      ):(
        <p>ASISTENCIA</p>
      )}
    </div>
    <div className="notification-description-icon">
    {typeof data.notificationData === "string" ? (
                  <strong>{data.notificationData}</strong>
                ) : (
                  <>
                    <strong>
                      {data.notificationData.internFullName}
                    </strong>{" "}
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <p>DEPARTAMENTO: </p>
                      {data.notificationData.internInternshipDepartment || ""}
                    </div>
                    <p>{data.notificationData.attendanceType || ""}</p>
                  </>
                )}
    </div>
    <div className="notification-date">
       <p >{formatDateOther(data.createdAt.toString())}</p>
    </div>
  </div>
  
  );
};

export default NotificationsCard;
