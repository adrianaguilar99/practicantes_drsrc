import { DataSupervisor, PatchSupervisor, PostSupervisor, SupervisorInterface } from "../../interfaces/supervisors/supervisor.interface";
import { apiUrl } from "../api-request";

export async function getSupervisorsData(Token: string): Promise<SupervisorInterface | null> {
    try {
      const response = await fetch(apiUrl + "/supervisors", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
  
      if (!response.ok) {
        console.error("Error al traer los datos de los supervisores");
        throw new Error("Error al traer los datos de los supervisores");
      }
  
      const SupervisorsData: SupervisorInterface = await response.json(); 
      console.log(SupervisorsData);
      return SupervisorsData;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }
  
  
  export async function postSupervisor(Token: string, data: PostSupervisor): Promise<PostSupervisor | null> {
    try {
      const response = await fetch(apiUrl + "/supervisors", {
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
  
      const responseJson: DataSupervisor = await response.json();
      return responseJson;
    } catch (error: any) {
      console.error("Error:", error);
      throw error;
    }
  }
  
  export async function patchSupervisor(Token: string, id: string, data: PatchSupervisor): Promise<PatchSupervisor | null> {
    try {
      const response = await fetch(apiUrl + "/supervisors/" + id + "", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error al enviar los nuevos datos del supervisor");
      }
  
      const responseJson: DataSupervisor = await response.json();
      return responseJson;
    } catch (error: any) {
      console.error("Error:", error);
      throw error;
    }
  }
  
  export async function deleteSupervisor(Token: string, id: string) {
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
        throw new Error(errorResponse.message || "Error al eliminar el supervisor");
      }
  
      const responseJson: DataSupervisor = await response.json();
      return responseJson;
    } catch (error: any) {
      console.error("Error:", error);
      throw error;
    }
  }
  