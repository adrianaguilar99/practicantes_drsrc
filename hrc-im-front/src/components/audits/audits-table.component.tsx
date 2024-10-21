import { Pagination } from "@mui/material";
import { AuditsCard } from "./audits-card.component";
import { useEffect, useState } from "react";
import { AuditsInterface } from "../../interfaces/audits/audits.interface";



export interface TableProps {
  data?: any[];  
  onUpdate: () => void;
}

interface AuditsTableProps {
  data?: AuditsInterface[];  // data es opcional
  onUpdate: () => void;
}

export const AuditsTable: React.FC<AuditsTableProps> = ({ data = [], onUpdate }) => {
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

  // Manejo de la paginación
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const PageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  // Filtro de las auditorías que se deben mostrar en la página actual
  const displayedAudits = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div>
      <div className="table-headers">
        <span>Acción</span>
        <span>Responsable</span>
        <span>Entidad</span>
        <span>Fecha</span>
      </div>
      <div className="audits-table">
        {displayedAudits.map((audit, index) => (
          <AuditsCard
            key={index}
            action={audit.action}
            responsible={audit.responsible}
            entity={audit.entityAffected}
            date={audit.auditDate}
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
    </div>
  );
};
