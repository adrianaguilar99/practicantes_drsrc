import { useState } from "react";
import { CustomModal } from "../../modals/general-modal.component";

interface InternCardProps {
    id: string;
    nombre: string;
    departamento: string;
    tipo: 'INTERNO' | 'EXTERNO';
    type_check: String;
    date: string;
  }

export const CheckInCheckOutCard : React.FC<InternCardProps> = ({
    id,
    nombre,
    departamento,
    tipo,
    type_check,
    date
  }) => {
    
    const [open, setOpen] = useState(false);
    const ModalState = () => {
      setOpen(!open);
    };

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
          <div className='checkincheckout-info-section'>
             
            {type_check === 'SALIDA NO REGISTRADA' ? <h3 className='checkincheckout-bad-type' onClick={ ModalState}>{type_check}</h3> : type_check === 'RETARDO' ? <h3 className='checkincheckout-warning-type'>{type_check}</h3> : <h3 className='checkincheckout-good-type'>{type_check}</h3>}
            <CustomModal open={open} ModalState={ModalState} />
            <p>{date}</p>
          </div>
        </div>
        </div>
    );
}