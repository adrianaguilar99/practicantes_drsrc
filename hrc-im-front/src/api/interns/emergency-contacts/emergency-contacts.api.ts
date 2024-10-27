import { DataEmergencyContact, EmergencyContactInterface, PatchEmergencyContact, PostEmergencyContact } from "../../../interfaces/interns/emergency-contacts/emergency-contacts.interface";
import { apiUrl } from "../../api-request";


export async function patchEmergencyContact(Token: string, id: string, data: PatchEmergencyContact): Promise<PatchEmergencyContact | null> {
  try {
    const response = await fetch(apiUrl + "/emergency-contact/" + id + "", {
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

    const responseJson: DataEmergencyContact = await response.json();
    return responseJson;
  } catch (error: any) {
    console.error("Error:", error);
    throw error;
  }
}

export async function postEmergencyContact(Token: string, data: PostEmergencyContact): Promise< PostEmergencyContact | null> {
    try {
      const response = await fetch(apiUrl + "/emergency-contact", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error al enviar los contactos de emergencia");
      }
  
      const responseJson: any = await response.json();
      return responseJson;
    } catch (error: any) {
      console.error("Error:", error);
      throw error;
    }
  }

