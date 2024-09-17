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
        <p>{entity.type}</p>
      </section>
      <section className="entity-info-modal-body">
        <p className="entity-info-modal-name">{entity.name}</p>
        {entity.type === "INTERN" && (
          <>
            <p className="entity-info-modal-info">Email: {entity.email}</p>
            <p className="entity-info-modal-info">Tel: {entity.phone}</p>
          </>
        )}
      </section>
    </div>
  );
};
