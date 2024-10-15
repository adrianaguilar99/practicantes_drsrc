import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import { GetUrl } from '../../functions/utils.functions'; 
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import { FormModal } from '../modals/form-modal.component';
import { decryptData } from '../../functions/encrypt-data.function';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface AddButtonProps {
  onConfirm: () => void;
}

export const AddButton: React.FC<AddButtonProps> = ({ onConfirm }) => {
  const userRol = useSelector((state: RootState) => decryptData(state.auth.rol || "") || "");
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); 

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

  const handleClick = () => {
    if (url === 'interns') {
      navigate('/interns/intern-register');
    } else {
      handleOpen(); 
    }
  };

  const getIcon = () => {
    if (url === "departments") {
      return <DomainAddIcon />;
    } else if (url === "interns-institutions") {
      return <LocationCityOutlinedIcon />;
    } else if (url === "interns-careers") {
      return <ReceiptLongOutlinedIcon />;
    } else {
      return <PersonAddAlt1OutlinedIcon />;
    }
  };

  return (
    <>
      {url !== "audits" && url !== "checkin-checkout" && userRol != "SUPERVISOR" ? (
        <button className="add-button" onClick={handleClick}>
          Agregar
          {getIcon()}
        </button>
      ) : null}

      <FormModal 
        open={open} 
        onConfirm={onConfirm} 
        onCancel={handleClose} 
        title="Agregar" 
        type="Add" 
        entity={url} 
        message={''} 
        
      />
    </>
  );
};
