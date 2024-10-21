import { useEffect, useState } from "react";
import { SupervisorsCard } from "./supervisors-card.component";
import { Pagination } from "@mui/material";
import { TableProps } from "../audits/audits-table.component";

export const SupervisorsTable : React.FC<TableProps> = ({ data = [] }) => {
  
   

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
  
  
    const displayedSupervisors = data.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );
  return (

    <div>
      <div className="table-headers">
        <span>Nombre</span>
        <span>Permisos</span>
        <span>Departamento</span>
        <span>Acciones</span>
      </div>
      <div className="supervisors-table">
        {displayedSupervisors.map((supervisor, index) => (
         <SupervisorsCard key={index} name={supervisor.name} phone={supervisor.phone} rol={supervisor.rol} department={supervisor.department} />
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
