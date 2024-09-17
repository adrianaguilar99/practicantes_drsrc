import React from 'react';
import '../components.css';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

interface InternCardProps {
  nombre: string;
  departamento: string;
  progreso: number; // porcentaje de progreso
  tipo: 'INTERNO' | 'EXTERNO';
  onEdit: () => void;
  onDelete: () => void;
}

const InternCardComponent: React.FC<InternCardProps> = ({
  nombre,
  departamento,
  progreso,
  tipo,
  onEdit,
  onDelete
}) => {


  return (
    <div className='intern-card'>
    <div className={`intern-type  ${tipo === 'INTERNO' ? 'interno' : 'externo'}`}>
         <span >{`PRACTICANTE ${tipo}`}</span>
    </div>
    <div className='intern-card-container'>
      <div className='info-section'>
    
        <h3>{nombre}</h3>
        <p>Departamento: {departamento}</p>
      </div>
      <div className="progress-section">
        <span>{progreso === 100 ? '¡Completado!' : `${progreso}%`}</span>
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${progreso}%` }}
          ></div>
        </div>
       
      </div>
      <div className="actions">
        <button onClick={onEdit}>
          <EditOutlinedIcon />
        </button>
        <button onClick={onDelete}>
          <DeleteOutlineOutlinedIcon />
        </button>
      </div>
    </div>
    </div>

  );
};

export default InternCardComponent;
