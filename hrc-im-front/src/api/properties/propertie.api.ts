import { DataProperty, PatchProperty, PostProperty, PropertiesInterface } from "../../interfaces/properties/properties.interface";
import { apiUrl } from "../api-request";

export async function getPropertiesData(Token: string): Promise<PropertiesInterface | null> {
    try {
      const response = await fetch(apiUrl + "/properties", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
  
      if (!response.ok) {
        console.error("Error al traer los datos de las propiedades");
        throw new Error("Error al traer los datos de las propiedades");
      }
  
      const PropertiesData: PropertiesInterface= await response.json(); 
      return PropertiesData;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }

  export async function postProperty(Token: string, data: PostProperty): Promise<PostProperty | null> {
    try {
      const response = await fetch(apiUrl + "/properties", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error al enviar los datos de las propiedades");
      }
  
      const responseJson: DataProperty = await response.json();
      return responseJson;
    } catch (error: any) {
      console.error("Error:", error);
      throw error;
    }
  }
  
  export async function patchProperty(Token: string, id: string, data: PatchProperty): Promise<PatchProperty | null> {
    try {
      const response = await fetch(apiUrl + "/properties/" + id + "", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error al enviar los nuevos datos de la propiedad");
      }
  
      const responseJson: DataProperty = await response.json();
      return responseJson;
    } catch (error: any) {
      console.error("Error:", error);
      throw error;
    }
  }

  export async function deleteProperty(Token: string, id: string) {
    try {
      const response = await fetch(apiUrl + "/properties/" + id + "", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error al eliminar la propiedad");
      }
  
      const responseJson: DataProperty = await response.json();
      return responseJson;
    } catch (error: any) {
      console.error("Error:", error);
      throw error;
    }
  }