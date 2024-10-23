import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import { DeleteAllRecordsConfirmationModal } from '../modals/confirmation-modal.component';
import { useState } from 'react';

export const DeleteAllRecordsButton = () => {
    const [open, setOpen] = useState(false);
    const Open = () => setOpen(true);
    const Close = () => setOpen(false);

    const Click = () => {
          Open(); 
      };

    return (
        <>
          <button className="delete-all-records-button" onClick={Click}>
            <DeleteSweepOutlinedIcon className="delete-icon" />
            <span className="delete-all-records-text">Borrar todos los datos</span>
        </button>
         <DeleteAllRecordsConfirmationModal title='Eliminar todos los datos' message='Se borraran todos los datos de esta tabla de la base de datos.' onCancel={Close} onConfirm={() => null} open={open}/>
        </>
      
       
    );
};

