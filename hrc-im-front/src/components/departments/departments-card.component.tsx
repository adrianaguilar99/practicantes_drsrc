import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { LightstringToColor } from '../../functions/utils.functions';

interface DepartmentCardProps {
  name: string;
}

export const DepartmentsCard: React.FC<DepartmentCardProps> = ({ name }) => {
  const backgroundColor = LightstringToColor(name, 0.2);

  return (
    <div className="generic-card">
      <div className="generic-card-info">
        <p style={{ backgroundColor,padding: '10px', borderRadius: '20px', maxWidth: '15vw', fontWeight: 'bold', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>{name}</p>
      </div>
      <div className="generic-card-actions">
        <button >
          <EditOutlinedIcon />
        </button>
        <button >
          <DeleteOutlineOutlinedIcon />
        </button>
      </div>
    </div>
  );
};
