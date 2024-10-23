import { DataProperty, PropertieInterface } from "../../interfaces/properties/properties.interface";
import { apiUrl } from "../api-request";

export async function getPropertiesData(Token: string): Promise<PropertieInterface | null> {
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
  
      const PropertiesData: PropertieInterface= await response.json(); 
      console.log(PropertiesData);
      return PropertiesData;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }