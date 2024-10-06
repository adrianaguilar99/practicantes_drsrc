import React from 'react';
import '../../components.css';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigate } from 'react-router-dom';

interface InternCardProps {
  id: string;
  nombre: string;
  departamento: string;
  progreso: number; // porcentaje de progreso
  tipo: 'INTERNO' | 'EXTERNO';
  onClick?: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const InternCardComponent: React.FC<InternCardProps> = ({
  id,
  nombre,
  departamento,
  progreso,
  tipo,
  onEdit,
  onDelete
}) => {

  const navigate = useNavigate();


  const Click = () => {
    navigate(`/interns/intern-information/${id}`);
  };
  const EditClick = () => {
    navigate(`/interns/intern-information/${id}?edit=true`);
  };

  return (
    <div className='intern-card' >
      <div className={`intern-type  ${tipo === 'INTERNO' ? 'interno' : 'externo'}`} onClick={Click}>
        <span>{`PRACTICANTE ${tipo}`}</span>
      </div>
      <div className='intern-card-container' onClick={Click}>
        <div className='info-section'>
          <h3>{nombre}</h3>
          <p>Departamento: {departamento}</p>
        </div>
        <div className="progress-section">
          <span>{progreso === 100 ? '¡Completado!' : `${progreso}%`}</span>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progreso}%` }}></div>
          </div>
        </div>
      </div>
      <div className="actions">
        <EditOutlinedIcon onClick={EditClick} />

        <button onClick={onDelete}>
          <DeleteOutlineOutlinedIcon />
        </button>
      </div>
    </div>
  );
};

export default InternCardComponent;
