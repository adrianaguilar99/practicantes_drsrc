import { Pagination } from "@mui/material";
import { AuditsCard } from "./audits-card.component";
import { useEffect, useState } from "react";

export const AuditsTable = () => {
  const audits = [
    {
      action: "ACTUALIZACIÓN",
      responsable: "JUAN JOSE",
      entity: [
        {
          type: "INTERN",
          name: "LUIS FERNANDO",
          email: "qKpZb@example.com",
          phone: "123456789",
        },
      ],
      date: "2022-01-01",
    },
    {
      action: "INSERCCIÓN",
      responsable: "JUAN JOSE",
      entity: [
        {
          type: "DEPARTMENT",
          name: "FINANZAS",
        },
      ],
      date: "2022-01-01",
    },
    {
      action: "ACTUALIZACIÓN",
      responsable: "JUAN JOSE",
      entity: [
        {
          type: "INTERN",
          name: "MIGUEL ANGEL",
          email: "qKpZb@example.com",
          phone: "123456789",
        },
      ],
      date: "2022-01-01",
    },
    {
      action: "INSERCCIÓN",
      responsable: "JUAN JOSE",
      entity: [
        {
          type: "INTERN",
          name: "YOSHUA RAYMUNDO MORENO ARREDONDO",
          email: "qKpZb@example.com",
          phone: "123456789",
        },
      ],
      date: "2022-01-01",
    },
    {
      action: "ELIMINACIÓN",
      responsable: "ALEXANDER FERNANDO",
      entity: [
        {
          type: "DEPARTMENT",
          name: "FINANZAS",
        },
      ],
      date: "2022-01-01",
    },
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

  const totalPages = Math.ceil(audits.length / rowsPerPage);

  const PageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };


  const displayedAudits = audits.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  return (
    <div >
      <div className="table-headers">
        <span>Acción</span>
        <span>Responsable</span>
        <span>Entidad</span>
        <span>Fecha</span>
      </div>
      <div className="audits-table">
        {displayedAudits.map((audit, index) => (
          <AuditsCard
            key={index}
            action={audit.action}
            responsable={audit.responsable}
            entity={audit.entity}
            date={audit.date}
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
