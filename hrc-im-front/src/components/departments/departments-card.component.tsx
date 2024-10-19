import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { GetUrl, LightstringToColor } from '../../functions/utils.functions';
import { FormModal } from '../modals/form-modal.component';
import { useEffect, useState } from 'react';
import { deleteDepartment } from '../../api/departments/departments.api';
import { enqueueSnackbar } from 'notistack';
import { ConfirmationModal } from '../modals/confirmation-modal.component';

interface DepartmentCardProps {
  id: string;
  name: string;
  userToken: string;
  onConfirm: () => void;
}

export const DepartmentsCard: React.FC<DepartmentCardProps> = ({id, name, userToken, onConfirm }) => {
  const [open, setOpen] = useState(false);
  const backgroundColor = LightstringToColor(name, 0.2);
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

  const DeleteInstitution = () => {
    deleteDepartment(userToken, id)
      .then((data) => {
        if (data) {
          enqueueSnackbar('Departamento eliminado correctamente', { variant: 'success' });
          ConfirmationModalClose();
          onConfirm();
        }
      })
      .catch((error) => {
        enqueueSnackbar('Error al eliminar el Departamento', { variant: 'error' });
        ConfirmationModalClose();
      });

  };

  return (
    <div className="generic-card">
      <div className="generic-card-info">
        <p style={{ backgroundColor,padding: '10px', borderRadius: '20px', maxWidth: '15vw', fontWeight: 'bold', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>{name}</p>
      </div>
      <div className="generic-card-actions">
        <button >
          <EditOutlinedIcon onClick={ModalOpen}/>
        </button>
        <button onClick={ConfirmationModalOpen}>
          <DeleteOutlineOutlinedIcon />
        </button>
      </div>
      <FormModal open={open} onConfirm={onConfirm} type="Edit" onCancel={ModalClose} title="Editar Departamento" data={{id,name}} entity={url} />
      <ConfirmationModal open={confirmationOpen} onConfirm={DeleteInstitution} onCancel={ConfirmationModalClose} title="Eliminar Carrera" message="¿Estas seguro de eliminar esta carrera?" />
    </div>
  );
};
