import { UserInterface } from "../../../interfaces/users.interface";
import { apiUrl } from "../../api-request";


export async function getAdminsData(Token: string): Promise<UserInterface | null> {
    try {
      const response = await fetch(apiUrl + "/users/admins", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
  
      if (!response.ok) {
        console.error("Error al traer los datos de los administradores");
        throw new Error("Error al traer los datos de los administradores");
      }
  
      const AdminsData: UserInterface = await response.json(); 
      console.log(AdminsData);
      return AdminsData;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }