import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import CancelIcon from "@mui/icons-material/Cancel";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

interface NotificationsCardProps {
  type: string;
  date: string;
  color: string;
}

const NotificationsCard: React.FC<NotificationsCardProps> = ({
  type,
  date,
  color,
}) => {
  return (
    <div className="notification-card">
    <div className="notification-title">
      <h1 className={`notification-type ${color}`}>{type}</h1>
    </div>
    <div className="notification-description-icon">
      {(type === "ENTRADA" || type === "SALIDA") && <CheckCircleIcon className="check-icon" />}
      {type === "RETARDO REGISTRADO" && <ErrorIcon className="error-icon" />}
      {type === "SALIDA NO REGISTRADA" && <CancelIcon className="cancel-icon" />}
      {type === "FALTA" && <SentimentVeryDissatisfiedIcon className="falta-icon" />}
    </div>
    <div className="notification-date">
       <p >{date}</p>
    </div>
  </div>
  
  );
};

export default NotificationsCard;
