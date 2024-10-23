import { DataIntern, InternsInterface, PostIntern } from "../../interfaces/interns/interns.interface";
import { apiUrl } from "../api-request";

export async function postIntern(Token: string, data: PostIntern): Promise<PostIntern | null> {
    try {
      const response = await fetch(apiUrl + "/interns", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error al enviar los datos del practicante");
      }
  
      const responseJson: any = await response.json();
      return responseJson;
    } catch (error: any) {
      console.error("Error:", error);
      throw error;
    }
  }