import React from "react";
import "../components.css";
interface EntityInfoModalProps {
  entity: {
    type: string;
    name: string;
    email?: string;
    phone?: string;
  };
}

export const EntityInfoModal: React.FC<EntityInfoModalProps> = ({ entity }) => {
  return (
    <div className="entity-info-modal">
      <section className="entity-info-modal-header">
        <h6>{entity.type}</h6>
      </section>
      <section className="entity-info-modal-body">
        <h6 className="entity-info-modal-name">{entity.name}</h6>
        {entity.type === "INTERN" && (
          <>
            <h6 className="entity-info-modal-info">Email: {entity.email}</h6>
            <h6 className="entity-info-modal-info">Tel: {entity.phone}</h6>
          </>
        )}
      </section>
    </div>
  );
};
