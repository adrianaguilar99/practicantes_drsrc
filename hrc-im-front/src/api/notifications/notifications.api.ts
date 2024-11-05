import { NotificationsInterface } from "../../interfaces/notifications/notifications-menu/notification-menu.interface";
import { apiUrl } from "../api-request";

// comment
export async function getNotificationsData(Token: string): Promise<NotificationsInterface | null> {
    try {
      const response = await fetch(apiUrl + "/user-notifications", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
  
      if (!response.ok) {
        console.error("Error al traer los datos las notificaciones");
        throw new Error("Error al traer los datos de las notificaciones");
      }
  
      const NotificationsData: NotificationsInterface = await response.json(); 
      console.log(NotificationsData);
      return NotificationsData;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }