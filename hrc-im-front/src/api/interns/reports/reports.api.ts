import { PostReport } from "../../../interfaces/interns/reports/reports.interface";
import { apiUrl } from "../../api-request";

export async function postReport(Token: string, data: PostReport): Promise<any | null> {
    try {
      const response = await fetch(apiUrl + "/intern-reports", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error al enviar los datos del reporte");
      }
  
        const FileData: any = response.blob(); 
        return FileData;
    } catch (error: any) {
      throw error;
    }
  }