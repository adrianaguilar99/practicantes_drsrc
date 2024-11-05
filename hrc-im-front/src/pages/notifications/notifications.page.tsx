import { Notifications } from "@mui/icons-material";
import { Navbar } from "../../components/navbars/navbar.component";
import './notifications.page.css';
import { useState } from "react";
import { NotificationsInternPage } from "./notifications-intern.page";
import { Breadcrumb } from "../../components/utils/breadcrumb.component";
import { Footer } from "../../components/navbars/footer.component";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { decryptData } from "../../functions/encrypt-data.function";

const NotificationsPage = () => {
  const userRol = useSelector((state: RootState) => decryptData(state.auth.rol || "") || "");
  return (
    <div className="body-page">
      <Navbar />
      <div className="container-notifications">
        <section className="notifications-left-container">
           {userRol === "INTERN" ? (
             <NotificationsInternPage />
           ) : (
             <div style={{ minWidth: "14vw" }}></div>
           )}
        </section>
        <section className="notificacions-right-container">
          {userRol !== "INTERN" ? (

            <Breadcrumb />
          )
          : (
            null
          )}
              {/* <NotificationsTable /> */}
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default NotificationsPage;
