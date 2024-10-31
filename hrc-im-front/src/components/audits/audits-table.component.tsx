import { Avatar, Pagination, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import {
  AuditsInterface,
  EntityAffected,
} from "../../interfaces/audits/audits.interface";
import { stringAvatar } from "../../functions/utils.functions";
import { EntityInfoModal } from "./audits-infomodal.component";

export interface TableProps {
  data?: any[];
  onUpdate: () => void;
}

interface AuditsTableProps {
  data?: AuditsInterface[]; // data es opcional
  onUpdate: () => void;
}

export const AuditsTable: React.FC<AuditsTableProps> = ({
  data = [],
  onUpdate,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);

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
    window.addEventListener("resize", ResizePage);
    return () => window.removeEventListener("resize", ResizePage);
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

  // Estado para almacenar la entidad sobre la cual se hace hover
  const [hoveredEntityId, setHoveredEntityId] = useState<null | string>(null);

  // Generar un ID único para cada fila (combina el id de la entidad y el índice de la fila)
  const generateUniqueEntityId = (entityId: string, index: number) => {
    return `${entityId}-${index}`;
  };

  return (
    <div className="generic-table-container">
      <div className="generic-table-container-body">
        <table className="generic-table">
          <thead className="generic-table-headers">
            <tr>
              <th>Acción</th>
              <th>Responsable</th>
              <th>Entidad</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {displayedAudits.map((audit, index) => {
              const uniqueEntityId = generateUniqueEntityId(
                audit.entityAffected.id ?? "",
                index
              );
              return (
                <tr key={index} className="generic-table-row">
                  <td>
                    <Tooltip
                      title={`Se ha realizado la acción "${audit?.action}" de ${audit?.entityAffected.data} en la base de datos`}
                      arrow
                      style={{ marginLeft: "15px" }}
                    >
                      <p
                        className={`intern-type-card ${
                          audit?.action.split(" ")[0] === "CREATE"
                            ? "insertion"
                            : audit?.action.split(" ")[0] === "UPDATE"
                            ? "update"
                            : "delete"
                        }`}
                      >
                        {audit?.action.split(" ")[0] === "CREATE"
                          ? "INSERCION"
                          : audit?.action.split(" ")[0] === "UPDATE"
                          ? "ACTUALIZACION"
                          : audit?.action.split(" ")[0] === "DELETE"
                          ? "ELIMINACION"
                          : audit?.action.split(" ")[0] === "TRY" &&
                            audit?.action.split(" ")[1] === "TO" &&
                            audit?.action.split(" ")[2] === "CREATE"
                          ? "INTENTO DE INSERCCION"
                          : "ERROR"}
                      </p>
                    </Tooltip>
                  </td>
                  <td >
                    <span style={{ display: "flex", alignItems: "center"}}>
                  <Avatar  {...stringAvatar(audit.responsible?.fullName || "") } />
                    <p className="supervisor-name">
                      {audit.responsible?.fullName || ""}
                    </p>
                       </span>
                    
                  </td>
                  <td>
                    <p className="entity-card">
                      <span
                        onMouseEnter={() => setHoveredEntityId(uniqueEntityId)}
                        onMouseLeave={() => setHoveredEntityId(null)}
                        style={{ position: "relative" }}
                      >
                        {audit.action.split(" ")[
                          audit.action.split(" ").length - 1
                        ]}
                        {hoveredEntityId === uniqueEntityId && (
                          <div
                            style={{
                              position: "absolute",
                              top: "100%",
                              left: "0",
                            }}
                          >
                            <EntityInfoModal entity={audit.entityAffected} />
                          </div>
                        )}
                      </span>
                    </p>
                  </td>
                  <td>
                    <p className="date-card">
                      {new Date(audit.auditDate).toLocaleDateString()}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
