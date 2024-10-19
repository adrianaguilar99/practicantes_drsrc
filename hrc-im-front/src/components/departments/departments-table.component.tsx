import { useState, useEffect } from 'react';
import { Pagination } from '@mui/material';
import '../components.css';
import { DepartmentsCard } from './departments-card.component';
import { TableProps } from '../audits/audits-table.component';

export const DepartmentsTable : React.FC<TableProps> = ({onUpdate,  data = [] }) => {

  const userToken = sessionStorage.getItem("_Token") || "";
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


  const displayedDepartments = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div>
      <div className="table-headers">
        <span>Nombre departamento</span>
        <span>Acciones</span>
      </div>
      <div className="interns-table">
        {displayedDepartments.map((department, index) => (
          <DepartmentsCard 
          key={index} 
          id={department.id}
          name={department.name}
          userToken={userToken}
          onConfirm={onUpdate}
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
        size='small'
      />
      </div>
   
    </div>
  );
};
