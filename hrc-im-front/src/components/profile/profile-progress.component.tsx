import { pieArcLabelClasses, PieChart } from "@mui/x-charts";
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

export const ProfileProgress = () => {
    const customColors = ["#4AAF80", "#C2C2C2"];

    // Variantes de animación
    const pageVariants = {
      initial: { opacity: 0, scale: 0.8 },
      in: { opacity: 1, scale: 1 },
      out: { opacity: 0, scale: 0.8 },
    };
  
    const pageTransition = {
      type: "spring",
      stiffness: 50,
      damping: 20,
    };
    return (
        <>
         <div className="profile-data-container-header">
                        <MilitaryTechIcon sx={{fontSize: '2.5rem'}} />
                        <h1>Mi progreso</h1>
                    </div>
                    <div className="profile-progress">
            
            <div className="intern-view-pie-container">
            <PieChart
              series={[
                {
                  arcLabel: (item) => `${item.value}%`,
                  arcLabelMinAngle: 35,
                  arcLabelRadius: "60%",
                  data: data.data.map((item, index) => ({
                    ...item,
                    color: customColors[index],
                  })),
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
            </div>
     
        </div>
        </>
      
    );
}

const data = {
    data: [
      {
        name: "Completado",
        value: 65,
      },
      {
        name: "Pendiente",
        value: 35,
      },
    ],
  };