import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getInternsByDate } from '../../api/charts/charts.api';

export interface ChartData {
  date: string;
  interns: number;
 
}
 
interface InternsBarChartProps {
  chartData: any[];
  device: string;
}
const InternsBarChart: React.FC<InternsBarChartProps> = ({ chartData, device }) => {

  return (
    <div>
      <label>Practicantes registrados:</label>
      <ResponsiveContainer width="100%" height={device === 'desktop' ? 300 : 200} minWidth={device === 'desktop' ? 500 : 200}>
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
