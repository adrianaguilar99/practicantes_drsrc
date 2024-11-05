import React from "react";
import "../components.css";
import { EntityAffected } from "../../interfaces/audits/audits.interface";

interface EntityInfoModalProps {
  type: string;
  entity: EntityAffected & { 
    data: string; 
    type?: string; 
    email?: string; 
    phone?: string; 
    postedComment?: string; // Add this line
    name?: string;
  };
}

export const EntityInfoModal: React.FC<EntityInfoModalProps> = ({type, entity }) => {
  return (
    <div className="entity-info-modal">
      <section className="entity-info-modal-body">
        <h6 className="entity-info-modal-name">Detalles: {entity.data || entity.postedComment || entity.name || "No disponible"}</h6>
        {type === "INTERN" || type === "USER" && (
          <>
            <h6 className="entity-info-modal-info">Email: {entity.email || "No disponible"}</h6>
            <h6 className="entity-info-modal-info">Tel: {entity.phone || "No disponible"}</h6>
          </>
        )}
      </section>
    </div>
  );
};
