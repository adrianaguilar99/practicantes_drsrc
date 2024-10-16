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
        "Authorization": `Bearer ${refreshToken}`,
      }
    });
console.log(response);
    if (!response.ok) {
      console.error("Error al obtener el nuevo token");
      throw new Error('Error al obtener el nuevo token');
    }

    return await response.json(); 
  } catch (error) {
    console.error(error);
    return null; 
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






