import { pieArcLabelClasses, PieChart } from "@mui/x-charts";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import { InternChartProgress } from "../charts/intern-chart-progress.component";


interface ProfileProgressProps {
  dataProgress: number;
}

export const ProfileProgress: React.FC<ProfileProgressProps> = ({ dataProgress }) => {



  return (
    <>
      <div className="profile-data-container-header">
        <MilitaryTechIcon sx={{ fontSize: "2.5rem" }} />
        <h1>Mi progreso</h1>
      </div>
      <div className="profile-progress">
        <div className="intern-view-pie-container">
          <InternChartProgress dataProgress={dataProgress}/>
        </div>
      </div>
      
    </>
  );
};
