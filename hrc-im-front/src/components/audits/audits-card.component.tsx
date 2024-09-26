import React, { useState } from "react";
import { EntityInfoModal } from "./audits-infomodal.component";
import { Avatar, Tooltip } from "@mui/material";
import { stringAvatar } from "../../functions/utils.functions";

interface DepartmentCardProps {
  action: string;
  responsable: string;
  entity: EntityProps[];
  date: string;
}

interface EntityProps {
  type: string;
  name: string;
  email?: string;
  phone?: string;
}

export const AuditsCard: React.FC<DepartmentCardProps> = ({
  action,
  responsable,
  entity,
  date,
}) => {
  const [hoveredEntity, setHoveredEntity] = useState<null | EntityProps>(null);

  return (
    <div className="generic-card">
      <div className="generic-card-info">
      <Tooltip title={`Se ha realizado la ${action} de ${entity[0].name} en la base de datos`} arrow>
        <p
          className={`intern-type-card ${action === "INSERCCIÓN" ? "insertion" : action === "ACTUALIZACIÓN" ? "update" : "delete"}`}
        >
          {action}
        </p>
      </Tooltip>

      <Avatar {...stringAvatar(responsable)} /><p className="supervisor-name">{responsable}</p>
        <p className="entity-card">
          {entity.map((ent, index) => (
            <span
              key={index}
              onMouseEnter={() => setHoveredEntity(ent)}
              onMouseLeave={() => setHoveredEntity(null)}
              style={{ position: "relative" }} // Asegúrate de agregar esta línea para el posicionamiento absoluto
            >
              {ent.type}
              {hoveredEntity === ent && (
                <div style={{ position: "absolute", top: "100%", left: "0" }}>
                  {" "}
                  {/* Ajusta la posición según tu diseño */}
                  <EntityInfoModal entity={hoveredEntity} />
                </div>
              )}
              {index < entity.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
        <p className="date-card">{date}</p>
      </div>
    </div>
  );
};
