import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Avatar } from '@mui/material';
import { GetUrl, LightstringToColor, stringAvatar} from '../../functions/utils.functions';
import { useEffect, useState } from 'react';
import { FormModal } from '../modals/form-modal.component';
import PhoneEnabledOutlinedIcon from '@mui/icons-material/PhoneEnabledOutlined';
import { Email } from '@mui/icons-material';

interface SupervisorCardProps {
    id?: string;
    name: string;
    rol: string;
    department: string;
    phone?: string;
    userToken?: string;
  }

export const SupervisorsCard: React.FC<SupervisorCardProps> = ({ name,rol, phone, department }) => {
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
            <div className="generic-card-info-users">
                <div className='generic-card-info-extra'>
                <Avatar {...stringAvatar(name)} /><p>{name}</p>
                </div>
                <div className="generic-card-info-column-extra">
                <p style={{ backgroundColor,padding: '10px', borderRadius: '20px', maxWidth: '15vw', fontWeight: 'bold', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>{rol}</p>
                </div>
                
                <p style={{ backgroundColor,padding: '10px', borderRadius: '20px', marginLeft: '13%', maxWidth: '25vw', fontWeight: 'bold', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>{department}</p>
            </div>
            <div className="generic-card-actions">
              {phone &&(
 <button>
 <PhoneEnabledOutlinedIcon />
</button>
              )}
               
                <button>
                    <EditOutlinedIcon  onClick={ModalOpen}/>
                </button>
                <button>
                    <DeleteOutlineOutlinedIcon />
                </button>
            </div>
            <FormModal open={open} onConfirm={ModalClose} type="Edit" onCancel={ModalClose} data={{name, rol, Email, phone, department}} title="Editar Supervisor" entity={url} />
        </div>
    );
}

