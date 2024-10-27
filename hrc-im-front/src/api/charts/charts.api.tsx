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
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log(result);
        if (!result.data) {
          throw new Error('No data found in the response');
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
        console.error("Error fetching interns by role:", error);
        throw error;
      }
  }
  