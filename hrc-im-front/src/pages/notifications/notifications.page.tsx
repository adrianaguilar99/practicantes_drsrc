import { Notifications } from "@mui/icons-material";
import { Navbar } from "../../components/navbars/navbar.component";
import './notifications.page.css';
import { NotificationsTable } from "../../components/notifications/notifications.component";

const NotificationsPage = () => {
  return (
    <div className="body-page">
      <Navbar />
      <div className="container-notifications">
        <section className="notificacions-left-container"></section>
        <section className="notificacions-right-container">
              <h1>Notificaciones</h1>
              <p>Recibidas</p>
              <NotificationsTable />
        </section>
      </div>
      
    </div>
  );
};

export default NotificationsPage;
