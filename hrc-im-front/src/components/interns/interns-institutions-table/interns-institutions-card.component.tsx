import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { GetUrl, LightstringToColor } from '../../../functions/utils.functions';
import { useEffect, useState } from 'react';
import { FormModal } from '../../modals/form-modal.component';
interface InstitutionsCardProps {
  id: string;
  name: string;
  phone: string;
  onEdit: () => void;
  onDelete: () => void;
  onConfirm: () => void;
}

export const InstitutionsCard: React.FC<InstitutionsCardProps> = ({ id, name, phone, onEdit, onDelete, onConfirm }) => {
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

  return (
    <div className="generic-card">
      <div className="generic-card-info">
        <p style={{ backgroundColor,padding: '10px', borderRadius: '20px', maxWidth: '25vw', fontWeight: 'bold', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>{name}</p>
        <p style={{marginRight: '30%'}}>{phone}</p>
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
    </div>
  );
};
