import { DataInstitution, InstitutionsInterface, PatchInstitution, PostInstitution } from "../../../interfaces/institutions/institutions.interface";
import { apiUrl } from "../../api-request";

export async function getInstitutionsData(Token: string): Promise<InstitutionsInterface | null> {
    try {
      const response = await fetch(apiUrl + "/institutions", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
  
      if (!response.ok) {
        console.error("Error al traer los datos de las instituciones");
        throw new Error("Error al traer los datos de las instituciones");
      }
  
      const CareersData: InstitutionsInterface = await response.json(); 
      console.log(CareersData);
      return CareersData;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }

  export async function postInstitution(Token: string, data: PostInstitution): Promise<PostInstitution | null> {
    try {
      const response = await fetch(apiUrl + "/institutions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error al enviar los datos de la institución");
      }
  
      const responseJson: DataInstitution = await response.json();
      return responseJson;
    } catch (error: any) {
      console.error("Error:", error);
      throw error;
    }
  }
  
  export async function patchInstitution(Token: string, id: string, data: PatchInstitution): Promise<PatchInstitution | null> {
    try {
      const response = await fetch(apiUrl + "/institutions/" + id + "", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error al enviar los nuevos datos de la institución");
      }
  
      const responseJson: DataInstitution = await response.json();
      return responseJson;
    } catch (error: any) {
      console.error("Error:", error);
      throw error;
    }
  }

  export async function deleteInstitution(Token: string, id: string) {
    try {
      const response = await fetch(apiUrl + "/institutions/" + id + "", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error al eliminar la Institución");
      }
  
      const responseJson: DataInstitution = await response.json();
      return responseJson;
    } catch (error: any) {
      console.error("Error:", error);
      throw error;
    }
  }