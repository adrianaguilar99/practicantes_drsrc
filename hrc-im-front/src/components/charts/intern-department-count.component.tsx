import { useEffect, useState } from "react";
import { getInternsByDepartment } from "../../api/charts/charts.api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { de } from "date-fns/locale";

interface DepartmentData {
  department: string;
  interns: number;
}

interface InternsBarChartDepartmentProps {
    device: string
}

export const InternsBarChartDepartment: React.FC<InternsBarChartDepartmentProps> = ({ device }) => {
    const [data, setData] = useState<DepartmentData[]>([]);
    const userToken = sessionStorage.getItem("_Token") || "";

    const fetchData = async () => {
      try {
        const response = await getInternsByDepartment(userToken);
        const apiData = response.data;
        const formattedData = Object.entries(apiData).map(([department, interns]) => ({
          department,
          interns: interns as number,
        }));
        setData(formattedData);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    useEffect(() => {
      fetchData();
    }, [userToken]);

    if (data.length === 0) return <p>Cargando...</p>;

    return (
      <div style={{ width: device === 'desktop' ? 800 : 500, margin: 'auto', height: device === 'desktop' ? 300 : 200 }}>
          <label>Practicantes por departamento:</label>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" />
            <YAxis  />
            <Tooltip />
            <Legend />
            <Bar dataKey="interns" fill="#4bc0c0" name="Practicantes" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
}
