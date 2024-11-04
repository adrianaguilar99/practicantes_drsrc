import { NotificationsInterface } from "../../interfaces/notifications/notifications-menu/notification-menu.interface";
import { apiUrl } from "../api-request";

// comment
export async function getNotificationsData(Token: string): Promise<NotificationsInterface | null> {
    try {
      const response = await fetch(apiUrl + "/user-notifications/unread", {
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
      return NotificationsData;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }

  export async function getALLNotifications(Token: string): Promise<NotificationsInterface | null> {
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
      return NotificationsData;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }

  export async function patchNotification(Token: string, id: string): Promise<any | null> {
    try {
      const response = await fetch(apiUrl + "/user-notifications/" + id + "/markAsRead", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },

      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error al marcar la notificación como leída");
      }
  
      const responseJson: any = await response.json();
      return responseJson;
    } catch (error: any) {
      console.error("Error:", error);
      throw error;
    }
  }