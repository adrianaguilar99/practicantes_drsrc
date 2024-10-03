import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { LightstringToColor } from '../../../functions/utils.functions';
interface InstitutionsCardProps {
  name: string;
  phone: string;
  onEdit: () => void;
  onDelete: () => void;
}

export const InstitutionsCard: React.FC<InstitutionsCardProps> = ({ name, phone, onEdit, onDelete}) => {
    const backgroundColor = LightstringToColor(name, 0.2);
  return (
    <div className="generic-card">
      <div className="generic-card-info">
        <p style={{ backgroundColor,padding: '10px', borderRadius: '20px', maxWidth: '25vw', fontWeight: 'bold', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>{name}</p>
        <p style={{marginRight: '30%'}}>{phone}</p>
      </div>
      <div className="generic-card-actions">
        <button onClick={onEdit}>
           <EditOutlinedIcon />
        </button>
        <button onClick={onDelete}>
          <DeleteOutlineOutlinedIcon />
        </button>
      </div>
    </div>
  );
};
