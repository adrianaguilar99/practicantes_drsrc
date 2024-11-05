import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface InternCardProps {
    id: string;
    internId: string;
    nombre: string;
    departamento: string;
    tipo: 'INTERNO' | 'EXTERNO';
    type_check: String;
    date: string;
    late: boolean;
  }

export const CheckInCheckOutCard : React.FC<InternCardProps> = ({
    id,
    nombre,
    departamento,
    internId,
    tipo,
    type_check,
    date,
    late
  }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const ModalState = () => {
      setOpen(!open);
    };

    return (
        <div className='intern-card-variation' onClick={()=> navigate(`/interns/intern-information/${internId}`)}>
        <div className={`intern-type  ${tipo === 'INTERNO' ? 'interno' : 'externo'}`}>
             <span >{`PRACTICANTE ${tipo}`}</span>
        </div>
        <div className='intern-card-container'>
          <div className='info-section'>
        
            <h3>{nombre}</h3>
            <p>Departamento: {departamento}</p>
          </div>
          <div className='checkincheckout-info-section'>
             
            {type_check === 'SALIDA NO REGISTRADA' ? <h3 className='checkincheckout-bad-type' onClick={ ModalState}>{type_check}</h3> : late === true ? <h3 className='checkincheckout-warning-type'>{type_check}</h3> : <h3 className='checkincheckout-good-type'>{type_check}</h3>}
            <p>{date}</p>
          </div>
        </div>
        </div>
    );
}