import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { GetUrl, LightstringToColor } from '../../../functions/utils.functions';
import { useEffect, useState } from 'react';
import { FormModal } from '../../modals/form-modal.component';
interface InstitutionsCardProps {
  name: string;
  phone: string;
  onEdit: () => void;
  onDelete: () => void;
}

export const InstitutionsCard: React.FC<InstitutionsCardProps> = ({ name, phone, onEdit, onDelete}) => {
    const backgroundColor = LightstringToColor(name, 0.2);
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState("");
  
    const ModalState = () => {
      setOpen(!open);
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

  return (
    <div className="generic-card">
      <div className="generic-card-info">
        <p style={{ backgroundColor,padding: '10px', borderRadius: '20px', maxWidth: '25vw', fontWeight: 'bold', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>{name}</p>
        <p style={{marginRight: '30%'}}>{phone}</p>
      </div>
      <div className="generic-card-actions">
        <button onClick={onEdit}>
           <EditOutlinedIcon onClick={ModalOpen}/>
        </button>
        <button onClick={onDelete}>
          <DeleteOutlineOutlinedIcon />
        </button>
      </div>
      <FormModal open={open} onConfirm={ModalClose} type="Edit" onCancel={ModalClose} data={{name, phone}} title="Editar Supervisor" entity={url} />
    </div>
  );
};
