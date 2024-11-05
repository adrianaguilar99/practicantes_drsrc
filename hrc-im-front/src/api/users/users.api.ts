import { DataUser, PatchUser, PostUser, UserPostResponse } from "../../interfaces/users.interface";
import { apiUrl } from "../api-request";

export async function postUser(Token: string, data: PostUser){
    try {
      const response = await fetch(apiUrl + "/users", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error al enviar los datos del supervisor");
      }
  
      const responseJson: UserPostResponse = await response.json();
      return responseJson;
    } catch (error: any) {
      console.error("Error:", error);
      throw error;
    }
  }


  export async function patchUser(Token: string, id: string, data: PatchUser): Promise<PatchUser | null> {
    try {
      const response = await fetch(apiUrl + "/users/" + id + "", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error al enviar los nuevos datos del usuario");
      }
  
      const responseJson: DataUser = await response.json();
      return responseJson;
    } catch (error: any) {
      console.error("Error:", error);
      throw error;
    }
  }
  
  export async function deleteUser(Token: string, id: string) {
    try {
      const response = await fetch(apiUrl + "/users/" + id + "/deactive", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error al eliminar el usuario");
      }
  
      const responseJson: DataUser = await response.json();
      return responseJson;
    } catch (error: any) {
      console.error("Error:", error);
      throw error;
    }
  }

  export async function activateUser(Token: string, id: string) {
    try {
      const response = await fetch(apiUrl + "/users/" + id + "/active", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error al activar el usuario");
      }
  
      const responseJson: DataUser = await response.json();
      return responseJson;
    } catch (error: any) {
      console.error("Error:", error);
      throw error;
    }
  }
  