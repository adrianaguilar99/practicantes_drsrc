import { DataDepartment, DepartmentsInterface, PatchDepartment, PostDepartment } from "../../interfaces/departments/departments.interface";
import { apiUrl } from "../api-request";


export async function getDepartmentsData(Token: string): Promise<DepartmentsInterface | null> {
    try {
      const response = await fetch(apiUrl + "/departments", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
  
      if (!response.ok) {
        console.error("Error al traer los datos de los departamentos");
        throw new Error("Error al traer los datos de los departamentos");
      }
  
      const DepartmentsData: DepartmentsInterface = await response.json(); 
      return DepartmentsData;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }

  export async function postDepartment(Token: string, data: PostDepartment): Promise<PostDepartment | null> {
    try {
      const response = await fetch(apiUrl + "/departments", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error al enviar los datos del departamento");
      }
  
      const responseJson: DataDepartment = await response.json();
      return responseJson;
    } catch (error: any) {
      console.error("Error:", error);
      throw error;
    }
  }
  
  export async function patchDepartment(Token: string, id: string, data: PatchDepartment): Promise<PatchDepartment | null> {
    try {
      const response = await fetch(apiUrl + "/departments/" + id + "", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error al enviar los nuevos datos del departamento");
      }
  
      const responseJson: DataDepartment = await response.json();
      return responseJson;
    } catch (error: any) {
      console.error("Error:", error);
      throw error;
    }
  }

  export async function deleteDepartment(Token: string, id: string) {
    try {
      const response = await fetch(apiUrl + "/departments/" + id + "", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error al eliminar el departamento");
      }
  
      const responseJson: DataDepartment = await response.json();
      return responseJson;
    } catch (error: any) {
      console.error("Error:", error);
      throw error;
    }
  }