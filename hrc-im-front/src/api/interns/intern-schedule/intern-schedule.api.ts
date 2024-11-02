import { DataSchedule, PostSchedule, ScheduleInterface } from "../../../interfaces/interns/intern-schedule/intern-schedule.interface";
import { apiUrl } from "../../api-request";

export async function getScheduleData(Token: string, internId: string ): Promise<ScheduleInterface | null> {
    try {
      const response = await fetch(apiUrl + "/intern-schedule/" + internId , {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
  
      if (!response.ok) {
        console.error("Error al traer los datos del horario");
        throw new Error("Error al traer los datos del horario");
      }
  
      const ScheduleData: ScheduleInterface = await response.json(); 
      return ScheduleData;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }

  export async function patchSchedule(Token: string, id: string, data: PostSchedule): Promise<PostSchedule | null> {
    try {
      const response = await fetch(apiUrl + "/intern-schedule/" + id , {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error al enviar los nuevos datos del horario");
      }
  
      const responseJson: any = await response.json();
      return responseJson;
    } catch (error: any) {
      console.error("Error:", error);
      throw error;
    }
  }