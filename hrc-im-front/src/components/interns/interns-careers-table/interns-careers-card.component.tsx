import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { GetUrl, LightstringToColor } from '../../../functions/utils.functions';
import { useEffect, useState } from 'react';
import { FormModal } from '../../modals/form-modal.component';
import { ConfirmationModal } from '../../modals/confirmation-modal.component';
import { enqueueSnackbar } from 'notistack';
import { deleteCareer } from '../../../api/interns/careers/careers.api';
interface CareersCardProps {
  id: string;
  name: string;
  userToken: string;
  onEdit: () => void;
  onDelete: () => void;
  onConfirm: () => void;
}

export const CareersCard: React.FC<CareersCardProps> = ({id, name, userToken, onEdit, onDelete, onConfirm }) => {
  const backgroundColor = LightstringToColor(name, 0.2);
  const [open, setOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
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

  const DeleteCareer = () => {
    deleteCareer(userToken, id)
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
        <p style={{ backgroundColor,padding: '10px', borderRadius: '20px', fontWeight: 'bold', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>{name}</p>
      </div>
      <div className="generic-card-actions">
        <button onClick={ModalOpen}>
           <EditOutlinedIcon />
        </button>
        <button onClick={ConfirmationModalOpen}>
          <DeleteOutlineOutlinedIcon />
        </button>
      </div>
      <FormModal open={open} onConfirm={onConfirm} type="Edit" onCancel={ModalClose} data={{id , name}} title="Editar Carrera" entity={url} />
      <ConfirmationModal open={confirmationOpen} onConfirm={DeleteCareer} onCancel={ConfirmationModalClose} title="Eliminar Carrera" message="¿Estas seguro de eliminar esta carrera?" />
    </div>
  );
};
