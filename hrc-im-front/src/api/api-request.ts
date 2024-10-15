import { ca } from "date-fns/locale";
import { ProfileData, ProfileInterface } from "../interfaces/profile.interface";
import { CareersInterface, DataCareer, PatchCareer, PostCareer } from "../interfaces/careers/careers.intarface";
import process from "process";

export const apiUrl = import.meta.env.VITE_API_KEY;

export async function testApiConnection(refreshToken: string) {
  try{


    await fetch(apiUrl + "/tests/ok", {
    });
  }catch(error){
    console.error(error);
  }
}


export async function getNewToken(refreshToken: string) {
  try {
    console.log(refreshToken);
    const response = await fetch(apiUrl + "/auth/refresh-token", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${refreshToken}`,  // Corregido a Authorization y con "Bearer"
      }
    });
console.log(response);
    if (!response.ok) {
      console.error("Error al obtener el nuevo token");
      throw new Error('Error al obtener el nuevo token');
    }

    // En caso de éxito, devuelve el resultado de la respuesta
    return await response.json(); // Obtener el JSON de la respuesta
  } catch (error) {
    console.error(error);
    return null; // Retorna null en caso de error
  }
}

export async function getProfileData(Token: string): Promise<ProfileInterface | null> {
  try {
    const response = await fetch(apiUrl + "/users/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });

    if (!response.ok) {
      console.error("Error al obtener los datos del perfil");
      throw new Error("Error al obtener los datos del perfil");
    }

    const profileData: ProfileInterface = await response.json(); 
    console.log('se recuperaron los datos del perfil:' + profileData.data.firstName);
    return profileData;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Obtener las carreras

export async function getCareersData(Token: string): Promise<CareersInterface | null> {
  try {
    const response = await fetch(apiUrl + "/careers", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });

    if (!response.ok) {
      console.error("Error al traer los datos de las carreras");
      throw new Error("Error al traer los datos de las carreras");
    }

    const CareersData: CareersInterface = await response.json(); 
    console.log(CareersData);
    return CareersData;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}


export async function postCareer(Token: string, data: PostCareer): Promise<PostCareer | null> {
  try {
    const response = await fetch(apiUrl + "/careers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Error al enviar los datos de la carrera");
    }

    const responseJson: DataCareer = await response.json();
    return responseJson;
  } catch (error: any) {
    console.error("Error:", error);
    throw error;
  }
}

export async function patchCareer(Token: string, id: string, data: PatchCareer): Promise<PatchCareer | null> {
  try {
    const response = await fetch(apiUrl + "/careers/" + id + "", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${Token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Error al enviar los nuevos datos de la carrera");
    }

    const responseJson: DataCareer = await response.json();
    return responseJson;
  } catch (error: any) {
    console.error("Error:", error);
    throw error;
  }
}

export async function deleteCareer(Token: string, id: string) {
  try {
    const response = await fetch(apiUrl + "/careers/" + id + "", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Error al eliminar la carrera");
    }

    const responseJson: DataCareer = await response.json();
    return responseJson;
  } catch (error: any) {
    console.error("Error:", error);
    throw error;
  }
}




