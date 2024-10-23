import React from "react";
import "../components.css";
import { EntityAffected } from "../../interfaces/audits/audits.interface";

interface EntityInfoModalProps {
  entity: EntityAffected & { type?: string; email?: string; phone?: string }; // Añadimos las propiedades opcionales
}

export const EntityInfoModal: React.FC<EntityInfoModalProps> = ({ entity }) => {
  return (
    <div className="entity-info-modal">
      <section className="entity-info-modal-header">
        <h6>{entity.type || "Entidad"}</h6> 
      </section>
      <section className="entity-info-modal-body">
        <h6 className="entity-info-modal-name">{entity.name}</h6>
        {entity.type === "INTERN" && (
          <>
            <h6 className="entity-info-modal-info">Email: {entity.email || "No disponible"}</h6>
            <h6 className="entity-info-modal-info">Tel: {entity.phone || "No disponible"}</h6>
          </>
        )}
      </section>
    </div>
  );
};
