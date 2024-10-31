import { CommentsOfInternInterface, PatchComment, PostComment} from "../../../interfaces/interns/intern-comments/intern-comments.interface";
import { apiUrl } from "../../api-request";

export async function getCommentsByInternId(Token: string, id: string): Promise<CommentsOfInternInterface | null> {
    try {
      const response = await fetch(apiUrl + "/intern-comments/" + id + "/comments", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
  
      if (!response.ok) {
        console.error("Error al traer los comentarios del practicante");
        throw new Error("Error al traer los comentarios del practicante");
      }
  
      const InternsComments: CommentsOfInternInterface = await response.json(); 
      console.log(InternsComments);
      return InternsComments;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }


  export async function postComment(Token: string, data: PostComment): Promise<PostComment | null> {
    try {
      const response = await fetch(apiUrl + "/intern-comments", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error al enviar los datos del comentario");
      }
  
      const responseJson: any = await response.json();
      return responseJson;
    } catch (error: any) {
      console.error("Error:", error);
      throw error;
    }
  }

  export async function patchComment(Token: string, id: string, data: PatchComment): Promise<PatchComment | null> {
    try {
      const response = await fetch(apiUrl + "/intern-comments/" + id + "", {
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
  
      const responseJson: any = await response.json();
      return responseJson;
    } catch (error: any) {
      console.error("Error:", error);
      throw error;
    }
  }