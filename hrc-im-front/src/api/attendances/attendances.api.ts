import { AttendancesInterface, PostAttendance, PostAttendanceResponse } from "../../interfaces/attendances/attendances.interface";
import { apiUrl } from "../api-request";

export async function postAttendance(data: PostAttendance): Promise<PostAttendanceResponse> {
    try {
      const response = await fetch(apiUrl + "/attendances/register", {
        method: "POST",
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error al enviar los datos de la asistencia");
      }
  
      const responseJson: PostAttendanceResponse = await response.json();
      return responseJson;
    } catch (error: any) {
      console.error("Error:", error);
      throw error;
    }
  }


  export async function getAttendances(Token: string): Promise<AttendancesInterface | null> {
    try {
      const response = await fetch(apiUrl + "/attendances", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
  
      if (!response.ok) {
        console.error("Error al traer los datos de las asistencias");
        throw new Error("Error al traer los datos de las asistencias");
      }
  
      const AttendancesData: AttendancesInterface = await response.json(); 
      return AttendancesData;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }