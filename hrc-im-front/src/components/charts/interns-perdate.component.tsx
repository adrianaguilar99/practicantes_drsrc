import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getInternsByDate } from '../../api/charts/charts.api';

interface ChartData {
  date: string;
  interns: number;
}

const InternsBarChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const userToken = sessionStorage.getItem("_Token") || "";  

  useEffect(() => {
    const loadData = async () => {
      try {
        const dataByDate = await getInternsByDate(userToken);
        const formattedData = Object.keys(dataByDate)
          .map((date) => ({
            date,  
            interns: dataByDate[date],
          }))
          .sort((a, b) => {

            const dateA = new Date(a.date.split('/').reverse().join('-'));
            const dateB = new Date(b.date.split('/').reverse().join('-'));
            return dateA.getTime() - dateB.getTime();
          });
  
        setChartData(formattedData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
  
    loadData();
  }, []);
  

  return (
    <div>
      <label>Practicantes registrados:</label>
      <ResponsiveContainer width="100%" height={160} minWidth={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" label={{ value: "Fechas", position: "insideBottom", offset: -5 }} />
          <YAxis label={{ value: "Total de practicantes", angle: -90, position: "outsideLeft"  }}   />
          <Tooltip />
          <Legend margin={{ top: 20, right: 30, left: 20, bottom: 5 }} />
          <Bar dataKey="interns" fill="#8884d8"/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InternsBarChart;
