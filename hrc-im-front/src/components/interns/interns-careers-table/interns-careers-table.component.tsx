import { Pagination } from '@mui/material';
import '../../components.css';
import { CareersCard } from './interns-careers-card.component';
import { useEffect, useState } from 'react';
import { TableProps } from '../../audits/audits-table.component';
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
  
export const CareersTable : React.FC<TableProps> = ({ data = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6); 
  useEffect(() => {
    const ResizePage = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 1375) {
        setRowsPerPage(5);
      } else if (screenWidth < 1024) {
        setRowsPerPage(4);
      } else {
        setRowsPerPage(6);
      }
    };

    ResizePage();
    window.addEventListener('resize', ResizePage);
    return () => window.removeEventListener('resize', ResizePage);
  }, []);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const PageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };


  const displayedCareers = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );


  return (
    <div>
      <div className="table-headers">
        <span>Nombre de carrera</span>
        <span>Acciones</span>
      </div>
      <div className='interns-careers-table'>
         { displayedCareers.map((career, index) =>
              <CareersCard
                key={index}
                name={career.name}
                onEdit={() => {}}
                onDelete={() => {}}
              />
         )}
      </div>
      <div className="table-pagination">
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={PageChange}
        variant="outlined"
        shape="rounded"
        size='small'
      />
      </div>
    </div>
  );
};
