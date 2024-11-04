import { Notifications } from "@mui/icons-material";
import { Navbar } from "../../components/navbars/navbar.component";
import './notifications.page.css';
import { useEffect, useState } from "react";
import { NotificationsInternPage } from "./notifications-intern.page";
import { Breadcrumb } from "../../components/utils/breadcrumb.component";
import { Footer } from "../../components/navbars/footer.component";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { decryptData } from "../../functions/encrypt-data.function";
import { NotificationDataObject, NotificationsInterface } from "../../interfaces/notifications/notifications-menu/notification-menu.interface";
import { getALLNotifications } from "../../api/notifications/notifications.api";
import { da } from "date-fns/locale";
import { CircularProgress, NothingToSee } from "../../components/utils/circular-progress.component";
import { RetryElement } from "../../components/utils/retry-element.component";
import { NotificationsTable } from "../../components/notifications/notifications-table.component";

const NotificationsPage = () => {
  const userRol = useSelector((state: RootState) => decryptData(state.auth.rol || "") || "");
  const [data, setData] = useState<NotificationDataObject[]>([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [hasError, setHasError] = useState(false);   
  const userToken = sessionStorage.getItem("_Token") || "";

  const fetchData = async () => {
    setIsLoading(true);
    try {
        const fetchedData: NotificationsInterface | null = await getALLNotifications(userToken);
        if (fetchedData && fetchedData.data.length > 0) {
            setData(fetchedData.data);
            setHasError(false); 
        } else {
            setData([]);
            setHasError(false);
        }
    } catch (error) {
        setHasError(true);
    } finally {
        setIsLoading(false);
    }
};


  useEffect(() => {
    fetchData();
  }, [userToken]);
  
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

          <div className="notificacions-data-container">
          {isLoading ? (
              <CircularProgress type="secondary" />
            ) : hasError ? (
               <RetryElement onClick={() => fetchData()}/>
            ) : data.length === 0 ? (
              <NothingToSee />
            ) : (
              <NotificationsTable data={data || []} />
            )}
          
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default NotificationsPage;
