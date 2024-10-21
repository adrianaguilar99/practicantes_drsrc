import React, { useState } from "react";
import { stringAvatar } from "../../functions/utils.functions";
import {
  EntityAffected,
  Responsible,
} from "../../interfaces/audits/audits.interface";
import { Avatar, Tooltip } from "@mui/material";
import { EntityInfoModal } from "./audits-infomodal.component";

interface AuditCardProps {
  action: string;
  responsible: Responsible;
  entity: EntityAffected;
  date: Date;
}

export const AuditsCard: React.FC<AuditCardProps> = ({
  action,
  responsible,
  entity,
  date,
}) => {
  const [hoveredEntity, setHoveredEntity] = useState<null | EntityAffected>(
    null
  );

  return (
    <div className="generic-card">
      <div className="generic-card-info">
        <Tooltip
          title={`Se ha realizado la ${action} en ${entity.name} en la base de datos`}
          arrow
        >
          <p
            className={`intern-type-card ${
              action.split(" ")[0] === "CREATE"
                ? "insertion"
                : action.split(" ")[0] === "UPDATE"
                  ? "update"
                  : "delete"
            }`}
          >
            {action.split(" ")[0] === "CREATE"
              ? "INSERCION"
              : action.split(" ")[0] === "UPDATE"
                ? "ACTUALIZACION"
                : action.split(" ")[0] === "DELETE"
                ? "ELIMINACION"
                : action.split(" ")[0] === "TRY" && action.split(" ")[1] === "TO" && action.split(" ")[2] === "CREATE" ? "INTENTO DE INSERCCION" : "ERROR"}
          </p>
        </Tooltip>
        <Avatar {...stringAvatar(responsible.fullName)} />
        <p className="supervisor-name">{responsible.fullName}</p>

        <p className="entity-card">
          <span
            onMouseEnter={() => setHoveredEntity(entity)}
            onMouseLeave={() => setHoveredEntity(null)}
            style={{ position: "relative" }}
          >
            {action.split(" ")[action.split(" ").length - 1]}
            {hoveredEntity && (
              <div style={{ position: "absolute", top: "100%", left: "0" }}>
                <EntityInfoModal entity={hoveredEntity} />
              </div>
            )}
          </span>
        </p>
        <p className="date-card">{new Date(date).toLocaleDateString()}</p>
      </div>
    </div>
  );
};
