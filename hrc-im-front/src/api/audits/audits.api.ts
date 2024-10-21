import { AuditsInterface } from "../../interfaces/audits/audits.interface";
import { apiUrl } from "../api-request";

export async function getAuditsData(Token: string): Promise<AuditsInterface[] | null> {
  try {
      const response = await fetch(apiUrl + "/system-audits", {
          method: "GET",
          headers: {
              Authorization: `Bearer ${Token}`,
          },
      });

      if (!response.ok) {
          console.error("Error al traer los datos de las auditorías");
          throw new Error("Error al traer los datos de las auditorías");
      }

      const auditsData: AuditsInterface[] = await response.json(); 
      console.log(auditsData);
      return auditsData;
  } catch (error) {
      console.error("Error:", error);
      return null;
  }
}
