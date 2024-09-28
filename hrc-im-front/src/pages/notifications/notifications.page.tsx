import { Notifications } from "@mui/icons-material";
import { Navbar } from "../../components/navbars/navbar.component";
import './notifications.page.css';
import { NotificationsTable } from "../../components/notifications/notifications.component";
import { useState } from "react";
import { NotificationsInternPage } from "./notifications-intern.page";
import { Breadcrumb } from "../../components/utils/breadcrumb.component";
import { Footer } from "../../components/navbars/footer.component";

const NotificationsPage = () => {
  const [userRol, setUserRol] = useState<string>("Admin");
  return (
    <div className="body-page">
      <Navbar />
      <div className="container-notifications">
        <section className="notifications-left-container">
           {userRol === "Intern" ? (
             <NotificationsInternPage />
           ) : (
             <div style={{ minWidth: "14vw" }}></div>
           )}
        </section>
        <section className="notificacions-right-container">
          {userRol !== "Intern" ? (

            <Breadcrumb />
          )
          : (
            null
          )}
              <NotificationsTable />
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default NotificationsPage;
