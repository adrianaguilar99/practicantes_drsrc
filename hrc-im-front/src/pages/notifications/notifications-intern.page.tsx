import MyAvatar from '../../assets/images/avatar-test.jpg';
import './notifications.page.css';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
export const NotificationsInternPage = () => {
    return (
        <div className="notifications-intern-section">
                    <div className="notifications-intern-header">
                        <NotificationsActiveRoundedIcon sx={{fontSize: '2.5rem'}}/>
                        <h1>Notificaciones</h1>
                    </div>
                    <div className="notifications-intern-card-img">
                        <img src={MyAvatar} alt="Avatar" />
                    </div>
                    <div className="notifications-intern-card-info">
                        <h3>Leonardo Daniel Rebollo Calero</h3>
                        <p>Practicante Interno</p>
                    </div>
        </div>
    )
}