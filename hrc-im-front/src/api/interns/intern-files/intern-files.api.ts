import { tr } from "date-fns/locale";
import { PostInternFilesInterface } from "../../../interfaces/interns/intern-files/intern-files.interface";
import { apiUrl } from "../../api-request";
import { Url } from "url";

export async function postInternFiles(
  Token: string,
  internId: string,
  formData: FormData
): Promise<PostInternFilesInterface | null> {
  try {
    const response = await fetch(apiUrl + "/intern-files/" + internId + "/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Token}`,
      },
      body: formData, 
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Error al enviar los archivos del practicante");
    }

    const responseJson: PostInternFilesInterface = await response.json();
    return responseJson;
  } catch (error: any) {
    console.error("Error:", error);
    throw error;
  }
}
export async function getFiles(Token: string, filesId: string): Promise<any | null> {
  try {
      const response = await fetch(apiUrl + "/intern-files/" + filesId  ,{
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
  
          
        },
      });
      if (!response.ok) {
        console.error("Error al traer los archivos del practicante");
        throw new Error("Error al traer los archivos del practicante");
      }
  
      const FileData: any =  await response.json(); 
      return FileData;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
}

export async function getFilesSPLIT(Token: string, internId: string, fileName: string): Promise<any | null> {
    try {
        const response = await fetch(apiUrl + "/intern-files/" + internId + "/" + fileName, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${Token}`,
    
            
          },
        });

    
        if (!response.ok) {
          throw new Error("Error al traer los datos del archivo");
        }
    
        const FileData: any = response.blob(); 
        return FileData;
      } catch (error) {
        console.error("Error:", error);
        return null;
      }
}


export async function patchInternFiles(
  Token: string,
  Id: string,
  formData: FormData,
  internId: string,
): Promise<PostInternFilesInterface | null> {
  try {
    const response = await fetch(apiUrl + "/intern-files/" + Id + "/" + internId, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${Token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Error al enviar los nuevos archivos del practicante");
    }

    const responseJson: PostInternFilesInterface = await response.json();
    return responseJson;
  } catch (error: any) {
    console.error("Error:", error);
    throw error;
  }
}

