import { apiUrl } from "../api-request";

// fetchInternsByRole.ts
export interface UserData {
    userRole: string;
    createdAt: string;
  }
  
  export async function getInternsByDate(Token: string): Promise<Record<string, number>> {
    try {
        const response = await fetch(apiUrl + "/users", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          });
        if (!response.ok) {
          throw new Error('Error del servidor');
        }
        const result = await response.json();
        console.log(result);
        if (!result.data) {
          throw new Error('Los datos no han sido encontrados');
        }
        const filteredData: UserData[] = result.data.filter(
          (user: UserData) => user.userRole === "INTERN"
        );
        const internsByDate: Record<string, number> = {};
        filteredData.forEach((user) => {
          const date = new Date(user.createdAt).toLocaleDateString();
          internsByDate[date] = (internsByDate[date] || 0) + 1;
        });
        console.log(internsByDate);
        return internsByDate;

      } catch (error) {
        console.error("Error al obtener los datos:", error);
        throw error;
      }
  }


  export async function getInternsByDepartment(Token: string): Promise<any | null> {
    try {
      const response = await fetch(apiUrl + "/departments/intern-count", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
  
      if (!response.ok) {
        console.error("Error al traer el conteo de practicantes por departamento");
        throw new Error("Error al traer el conteo de practicantes por departamento");
      }
  
      const InternsData: any = await response.json(); 
      return InternsData;
    } catch (error) {
      return null;
    }
  }
  

  async function getInternsByCompletion( Token: string): Promise<string[]> {
    try {
        const response = await fetch(apiUrl + "/interns", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        const filteredInterns = result.data
            .filter((intern: any) => intern.totalInternshipCompletion > 90)
            .map((intern: any) => `${intern.user.firstName} ${intern.user.lastName}`);

        return filteredInterns;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

