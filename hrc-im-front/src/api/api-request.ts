import { ca } from "date-fns/locale";
import { ProfileData, ProfileInterface } from "../interfaces/profile.interface";
import { CareersInterface, DataCareer, PatchCareer, PostCareer } from "../interfaces/careers/careers.intarface";
import process from "process";
import { PostUser, UserPostResponse} from "../interfaces/users.interface";

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


export async function authLogin(email: string, password: string) {
  try {
    const response = await fetch(apiUrl + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    
    if (response.status === 404) {
      console.error("Error 404: ", data.message); 
      return {
        status: 404,
        message: data.message,
      };
    }

    if (!response.ok) {
      console.error("Error al iniciar sesión: ", data.message);
      throw new Error(`Error ${response.status}: ${data.message}`);
    }
    return data;
  } catch (error) {
    console.error("Error en authLogin:", error);
    return null;
  }
}





export async function postUser(Token: string, data: PostUser){
  try {
    const response = await fetch(apiUrl + "/users", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Error al enviar los datos del supervisor");
    }

    const responseJson: UserPostResponse = await response.json();
    return responseJson;
  } catch (error: any) {
    console.error("Error:", error);
    throw error;
  }
}




