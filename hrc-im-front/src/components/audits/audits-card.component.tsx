import React, { useState } from 'react';
import { EntityInfoModal } from './audits-infomodal.component';



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

export const AuditsCard: React.FC<DepartmentCardProps> = ({ action, responsable, entity, date }) => {
    const [hoveredEntity, setHoveredEntity] = useState<null | EntityProps>(null);

    return (
        <div className="generic-card">
            <div className="generic-card-info">
                <p>{action}</p>
                <p>{responsable}</p>
                <p>
                    {entity.map((ent, index) => (
                        <span
                            key={index}
                            onMouseEnter={() => setHoveredEntity(ent)}
                            onMouseLeave={() => setHoveredEntity(null)}
                            style={{ position: 'relative' }} // Asegúrate de agregar esta línea para el posicionamiento absoluto
                        >
                            {ent.type}
                            {hoveredEntity === ent && (
                                <div style={{ position: 'absolute', top: '100%', left: '0' }}> {/* Ajusta la posición según tu diseño */}
                                    <EntityInfoModal entity={hoveredEntity} />
                                </div>
                            )}
                            {index < entity.length - 1 ? ', ' : ''}
                        </span>
                    ))}
                </p>
                <p>{date}</p>
            </div>
        </div>
    );
};
