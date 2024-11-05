import { CareersInterface, DataCareer, PatchCareer, PostCareer } from "../../../interfaces/careers/careers.intarface";
import { apiUrl } from "../../api-request";

export async function getCareersData(Token: string): Promise<CareersInterface | null> {
    try {
      const response = await fetch(apiUrl + "/careers", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
  
      if (!response.ok) {
        console.error("Error al traer los datos de las carreras");
        throw new Error("Error al traer los datos de las carreras");
      }
  
      const CareersData: CareersInterface = await response.json(); 
      return CareersData;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }
  
  
  export async function postCareer(Token: string, data: PostCareer): Promise<PostCareer | null> {
    try {
      const response = await fetch(apiUrl + "/careers", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error al enviar los datos de la carrera");
      }
  
      const responseJson: DataCareer = await response.json();
      return responseJson;
    } catch (error: any) {
      console.error("Error:", error);
      throw error;
    }
  }
  
  export async function patchCareer(Token: string, id: string, data: PatchCareer): Promise<PatchCareer | null> {
    try {
      const response = await fetch(apiUrl + "/careers/" + id + "", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error al enviar los nuevos datos de la carrera");
      }
  
      const responseJson: DataCareer = await response.json();
      return responseJson;
    } catch (error: any) {
      console.error("Error:", error);
      throw error;
    }
  }
  
  export async function deleteCareer(Token: string, id: string) {
    try {
      const response = await fetch(apiUrl + "/careers/" + id + "", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error al eliminar la carrera");
      }
  
      const responseJson: DataCareer = await response.json();
      return responseJson;
    } catch (error: any) {
      console.error("Error:", error);
      throw error;
    }
  }
  