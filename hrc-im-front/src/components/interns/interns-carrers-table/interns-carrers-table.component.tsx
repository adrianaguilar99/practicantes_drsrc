import { Pagination } from '@mui/material';
import '../../components.css';
import { CarrersCard } from './interns-carrers-card.component';
export const carrers = [
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
    {
      id: 7,
      name: "MARTIN MARTINEZ ARIAS",
    }
  ];
  
export const CarrersTable = () => {



  return (
    <div>
      <div className="table-headers">
        <span>Nombre de carrera</span>
        <span>Acciones</span>
      </div>
      <div className='interns-carrers-table'>
         { carrers.map((carrer, index) =>
              <CarrersCard
                key={index}
                name={carrer.name}
                onEdit={() => {}}
                onDelete={() => {}}
              />
         )}
      </div>
      <Pagination count={10} variant="outlined" shape="rounded" />
    </div>
  );
};
