import InternCardComponent from './interns-card.component';
import '../../components.css';
import { Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { DataIntern } from '../../../interfaces/interns/interns.interface';
import { on } from 'events';
interface InternsTableProps {
  data?: DataIntern[];  
  onUpdate: () => void;
}

const InternsTable: React.FC<InternsTableProps> = ({ onUpdate, data = [] }) => {
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

  const displayedInterns = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <>
      <div className="table-headers">
        <span>Tipo practicante</span>
        <span>Practicante</span>
        <span>Progreso</span>
        <span>Acciones</span>
      </div>

      <div className="interns-table">
        {displayedInterns.map((intern) => (
          <InternCardComponent
            id={intern.id}
            data={intern}
            onUpdate={onUpdate}
          />
        ))}
      </div>

      <div className="table-pagination">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={PageChange}
          variant="outlined"
          shape="rounded"
          size="small"
        />
      </div>
    </>
  );
};

export default InternsTable;
