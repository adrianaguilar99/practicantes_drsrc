import { ca } from "date-fns/locale";

export async function testApiConnection(refreshToken: string) {
  try{


    await fetch("http://localhost:3000/api/auth/refresh-token", {
    });
  }catch(error){
    console.error(error);
  }
}


export async function getNewToken(refreshToken: string) {
  try {
    console.log(refreshToken);
    const response = await fetch("http://localhost:3000/api/auth/refresh-token", {
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
