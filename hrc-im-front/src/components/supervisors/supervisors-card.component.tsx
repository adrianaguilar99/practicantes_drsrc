import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Avatar } from '@mui/material';
import { GetUrl, LightstringToColor, stringAvatar} from '../../functions/utils.functions';
import { useEffect, useState } from 'react';
import { FormModal } from '../modals/form-modal.component';

interface SupervisorCardProps {
    name: string;
    department: string;
  }

export const SupervisorsCard: React.FC<SupervisorCardProps> = ({ name, department }) => {
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState("");
    const ModalState = () => {
      setOpen(!open);
    };

    const ModalOpen = () => setOpen(true);
    const ModalClose = () => setOpen(false);

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
    
    const backgroundColor = LightstringToColor(department, 0.2);
    
    return (
        <div className="generic-card">
            <div className="generic-card-info">
                <div className='generic-card-info-extra'>
                <Avatar {...stringAvatar(name)} /><p>{name}</p>
                </div>
                <div className='generic-card-info-column'>
                <p style={{ backgroundColor,padding: '10px', borderRadius: '20px', maxWidth: '15vw', fontWeight: 'bold', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>{department}</p>
                </div>
               
               
           
            </div>
            <div className="generic-card-actions">
                <button>
                    <EditOutlinedIcon  onClick={ModalOpen}/>
                </button>
                <button>
                    <DeleteOutlineOutlinedIcon />
                </button>
            </div>
            <FormModal open={open} onConfirm={ModalClose} type="Edit" onCancel={ModalClose} data={{name, department}} title="Editar Supervisor" entity={url} />
        </div>
    );
}

