import { useState, useEffect } from 'react';
import { Pagination } from '@mui/material';
import '../components.css';
import { DepartmentsCard } from './departments-card.component';

export const DepartmentsTable = () => {
  const departments = [
    { id: 1, name: "RECURSOS HUMANOS" },
    { id: 2, name: "TECNOLOGÍAS DE INFORMACIÓN" },
    { id: 3, name: "CONTABILIDAD" },
    { id: 4, name: "ENTRENAMIENTO" },
    { id: 5, name: "Departamento 3" },
    { id: 6, name: "Departamento 4" },
    { id: 7, name: "Departamento 5" },
    { id: 8, name: "Departamento 6" },
    { id: 9, name: "Departamento 7" },
    { id: 10, name: "Departamento 8" },
    { id: 11, name: "Departamento 9" },
    { id: 12, name: "Departamento 10" },
    { id: 13, name: "Departamento 11" },
    { id: 14, name: "Departamento 12" },
    { id: 15, name: "Departamento 13" },
    { id: 16, name: "Departamento 14" },
    { id: 17, name: "Departamento 15" },
    { id: 18, name: "Departamento 16" },
    { id: 19, name: "Departamento 17" },
    { id: 20, name: "Departamento 18" },
    { id: 21, name: "Departamento 19" },
    { id: 22, name: "Departamento 20" },
    { id: 23, name: "Departamento 21" },
    { id: 24, name: "Departamento 22" },
    { id: 25, name: "Departamento 23" },
    { id: 26, name: "Departamento 24" },
    { id: 27, name: "Departamento 25" },
    { id: 28, name: "Departamento 26" },
    { id: 29, name: "Departamento 27" },
    { id: 30, name: "Departamento 28" },
  ];

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

  const totalPages = Math.ceil(departments.length / rowsPerPage);

  const PageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };


  const displayedDepartments = departments.slice(
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
          <DepartmentsCard key={index} name={department.name} />
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
