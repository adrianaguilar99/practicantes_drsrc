import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { formatPhoneNumber, GetUrl, LightstringToColor } from '../../../functions/utils.functions';
import { useEffect, useState } from 'react';
import { FormModal } from '../../modals/form-modal.component';
import { ConfirmationModal } from '../../modals/confirmation-modal.component';
import { enqueueSnackbar } from 'notistack';
import { deleteInstitution } from '../../../api/interns/institutions/institutions.api';
interface InstitutionsCardProps {
  userToken: string;
  id: string;
  name: string;
  phone: string;
  onConfirm: () => void;
}

export const InstitutionsCard: React.FC<InstitutionsCardProps> = ({userToken, id, name, phone, onConfirm }) => {
    const backgroundColor = LightstringToColor(name, 0.2);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState("");
  
    const ModalState = () => {
      setOpen(!open);
    };

    const ConfirmationModalState = () => {
      setConfirmationOpen(!confirmationOpen);
    };
  

    useEffect(() => {
      const UrlChange = () => {
        const enurl = GetUrl();
        setUrl(enurl);
      };
      UrlChange();
      window.addEventListener("popstate", UrlChange);
      return () => {
        window.removeEventListener("popstate", UrlChange);
      };
    }, []);
    
    const ModalOpen = () => setOpen(true);
    const ModalClose = () => setOpen(false);
  
    const ConfirmationModalOpen = () => setConfirmationOpen(true);
    const ConfirmationModalClose = () => setConfirmationOpen(false);

    const DeleteInstitution = () => {
      deleteInstitution(userToken, id)
        .then((data) => {
          if (data) {
            enqueueSnackbar('Carrera eliminada correctamente', { variant: 'success' });
            ConfirmationModalClose();
            onConfirm();
          }
        })
        .catch((error) => {
          enqueueSnackbar('Error al eliminar la carrera', { variant: 'error' });
          ConfirmationModalClose();
        });
  
    };

  return (
    <div className="generic-card">
      <div className="generic-card-info">
        <p style={{ backgroundColor,padding: '10px', borderRadius: '20px', maxWidth: '25vw', fontWeight: 'bold', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>{name}</p>
        <p style={{marginRight: '30%'}}>{formatPhoneNumber(phone)}</p>
      </div>
      <div className="generic-card-actions">
      <button onClick={ModalOpen}>
           <EditOutlinedIcon />
        </button>
        <button onClick={ConfirmationModalOpen}>
          <DeleteOutlineOutlinedIcon />
        </button>
      </div>
      <FormModal open={open} onConfirm={onConfirm} type="Edit" onCancel={ModalClose} data={{id , name, phone}} title="Editar Institución" entity={url} />
      <ConfirmationModal open={confirmationOpen} onConfirm={DeleteInstitution} onCancel={ConfirmationModalClose} title="Eliminar Carrera" message="¿Estas seguro de eliminar esta carrera?" />
    </div>
  );
};
