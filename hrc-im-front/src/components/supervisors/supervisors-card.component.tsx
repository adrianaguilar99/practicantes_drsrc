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

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const handleUrlChange = () => {
          const enurl = GetUrl();
          setUrl(enurl);
        };
        handleUrlChange();
        window.addEventListener("popstate", handleUrlChange);
        return () => {
          window.removeEventListener("popstate", handleUrlChange);
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
                <p style={{ backgroundColor,padding: '10px', borderRadius: '10px', maxWidth: '15vw', fontWeight: 'bold' }}>{department}</p>
                </div>
               
               
           
            </div>
            <div className="generic-card-actions">
                <button>
                    <EditOutlinedIcon  onClick={handleOpen}/>
                </button>
                <button>
                    <DeleteOutlineOutlinedIcon />
                </button>
            </div>
            <FormModal open={open} onConfirm={handleClose} type="Edit" onCancel={handleClose} title="Editar Supervisor" entity={url} message={''} />
        </div>
    );
}

