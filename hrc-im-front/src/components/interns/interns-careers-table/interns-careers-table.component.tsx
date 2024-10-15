import { Pagination } from '@mui/material';
import '../../components.css';
import { CareersCard } from './interns-careers-card.component';
import { useEffect, useState } from 'react';
import { TableProps } from '../../audits/audits-table.component';
import { on } from 'events';

export const CareersTable : React.FC<TableProps> = ({ onUpdate, data = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7); 
  const userToken = sessionStorage.getItem("_Token") || "";
  useEffect(() => {
    const ResizePage = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 1375) {
        setRowsPerPage(5);
      } else if (screenWidth < 1024) {
        setRowsPerPage(4);
      } else {
        setRowsPerPage(7);
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
         { displayedCareers.map((career) =>
              <CareersCard
                key={career.id}
                id={career.id}
                name={career.name}
                userToken={userToken}
                onEdit={() => {}}
                onDelete={() => {}}
                onConfirm={onUpdate}
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
