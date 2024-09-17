import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

interface DepartmentCardProps {
  name: string;
}

export const DepartmentsCard: React.FC<DepartmentCardProps> = ({ name }) => {
  return (
    <div className="generic-card">
      <div className="generic-card-info">
        <p>{name}</p>
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
