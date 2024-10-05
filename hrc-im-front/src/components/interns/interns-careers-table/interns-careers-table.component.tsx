import { Pagination } from '@mui/material';
import '../../components.css';
import { CareersCard } from './interns-careers-card.component';
export const careers = [
    {
      id: 1,
      name: "INGENIERÍA EN SOFTWARE",
    },
    {
      id: 2,
      name: "INGENIERÍA EN BIOMEDICINA",
    },
    {
      id: 3,
      name: "INGENIERÍA EN ADMINISTRACIÓN",
    },
    {
      id: 4,
      name: "LICENCIATURA EN TECNOLOGÍ...",
    },
    {
      id: 5,
      name: "LICENCIATURA EN FISIO TERAPIA",
    },{
      id: 6,
      name: "LICENCIATURA EN ENFERMERÍA",
    },
  ];
  
export const CareersTable = () => {



  return (
    <div>
      <div className="table-headers">
        <span>Nombre de carrera</span>
        <span>Acciones</span>
      </div>
      <div className='interns-careers-table'>
         { careers.map((career, index) =>
              <CareersCard
                key={index}
                name={career.name}
                onEdit={() => {}}
                onDelete={() => {}}
              />
         )}
      </div>
      <Pagination count={10} variant="outlined" shape="rounded" />
    </div>
  );
};
