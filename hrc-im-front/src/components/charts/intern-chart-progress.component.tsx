import { pieArcLabelClasses, PieChart } from "@mui/x-charts";

interface InternChartProgressProps {
    dataProgress: number;
}

export const InternChartProgress: React.FC<InternChartProgressProps> = ({ dataProgress }) => {
    const completionPercentage = dataProgress || 0;
    const remainingPercentage = 100 - completionPercentage;
    const customColors = ["#4AAF80", "#C2C2C2"];

    return (
        <>
   <PieChart
            series={[
              {
                data: [
                  { value: completionPercentage, color: customColors[0] },
                  { value: remainingPercentage, color: customColors[1] },
                ],
                arcLabel: (item) => `${item.value}%`,
                arcLabelMinAngle: 35,
                arcLabelRadius: "60%",
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fontWeight: "bold",
                fill: "white",
                zIndex: 1,
              },
            }}
          />
          <div className="pie-chart-legend">
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: customColors[0] }}></div>
            <span>Completado</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: customColors[1] }}></div>
            <span>Restante</span>
          </div>
        </div>
      <style>
        {`
          .pie-chart-legend {
            display: flex;
            justify-content: center;
            margin-top: 10px;
            z-index: 1;
          }
          .legend-item {
            display: flex;
            align-items: center;
            margin-right: 15px;
          }
          .legend-color {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            margin-right: 5px;
          }
        `}
      </style>
        </>
     
    );
}