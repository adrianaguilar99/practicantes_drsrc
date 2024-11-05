import { DataIntern, GetByIDDataInter, GetByIDInternInterface, InternsInterface, PatchIntern, PostIntern } from "../../interfaces/interns/interns.interface";
import { apiUrl } from "../api-request";

export async function getInternsData(Token: string): Promise<InternsInterface | null> {
  try {
    const response = await fetch(apiUrl + "/interns", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });

    if (!response.ok) {
      console.error("Error al traer los datos de los practicantes");
      throw new Error("Error al traer los datos de los practicantes");
    }

    const InternsData: InternsInterface = await response.json(); 
    return InternsData;
  } catch (error) {
    return null;
  }
}
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
      throw error;
    }
  }

  export async function patchIntern(Token: string, id: string, data: PatchIntern): Promise<PatchIntern | null> {
    try {
      const response = await fetch(apiUrl + "/interns/" + id + "", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error al enviar los nuevos datos del interno");
      }
  
      const responseJson: any = await response.json();
      return responseJson;
    } catch (error: any) {
      console.error("Error:", error);
      throw error;
    }
  }


  export async function getInternById(Token: string, id: string): Promise<GetByIDInternInterface | null> {
    try {
      const response = await fetch(apiUrl + "/interns/" + id, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
  
      if (!response.ok) {
        console.error("Error al traer los datos del practicante");
        throw new Error("Error al traer los datos del practicante");
      }
  
      const InternsData: GetByIDInternInterface = await response.json(); 
      return InternsData;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }