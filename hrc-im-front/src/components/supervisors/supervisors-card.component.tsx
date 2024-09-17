import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Avatar } from '@mui/material';
import { stringAvatar } from '../../functions/utils.functions';

interface SupervisorCardProps {
    name: string;
    department: string;
  }

export const SupervisorsCard: React.FC<SupervisorCardProps> = ({ name, department }) => {
    return (
        <div className="generic-card">
            <div className="generic-card-info">
                <div className='generic-card-info-extra'>
                <Avatar {...stringAvatar(name)} /><p>{name}</p>
                </div>
                <div className='generic-card-info-column'>
                <p>{department}</p>
                </div>
               
               
           
            </div>
            <div className="generic-card-actions">
                <button>
                    <EditOutlinedIcon />
                </button>
                <button>
                    <DeleteOutlineOutlinedIcon />
                </button>
            </div>
        </div>
    );
}

