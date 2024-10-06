import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { GetUrl, LightstringToColor } from '../../functions/utils.functions';
import { FormModal } from '../modals/form-modal.component';
import { useEffect, useState } from 'react';

interface DepartmentCardProps {
  name: string;
}

export const DepartmentsCard: React.FC<DepartmentCardProps> = ({ name }) => {
  const [open, setOpen] = useState(false);
  const backgroundColor = LightstringToColor(name, 0.2);
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
        <p style={{ backgroundColor,padding: '10px', borderRadius: '20px', maxWidth: '15vw', fontWeight: 'bold', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>{name}</p>
      </div>
      <div className="generic-card-actions">
        <button >
          <EditOutlinedIcon onClick={ModalOpen}/>
        </button>
        <button >
          <DeleteOutlineOutlinedIcon />
        </button>
      </div>
      <FormModal open={open} onConfirm={ModalClose} type="Edit" onCancel={ModalClose} title="Editar Departamento" data={{name}} entity={url} />
    </div>
  );
};
