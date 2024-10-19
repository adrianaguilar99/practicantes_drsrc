import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import { GetUrl } from '../../functions/utils.functions'; 
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import { FormModal } from '../modals/form-modal.component';

interface AddButtonProps {
  onConfirm: () => void;
  userRol?: string;
}

export const AddButton: React.FC<AddButtonProps> = ({ userRol, onConfirm }) => {
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); 

  const Open = () => setOpen(true);
  const Close = () => setOpen(false);

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

  const Click = () => {
    if (url === 'interns') {
      navigate('/interns/intern-register');
    } else {
      Open(); 
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
        <button className="add-button" onClick={Click}>
          Agregar
          {getIcon()}
        </button>
      ) : null}

      <FormModal 
        open={open} 
        onConfirm={onConfirm} 
        onCancel={Close} 
        title="Agregar" 
        type="Add" 
        entity={url} 
      />
    </>
  );
};
