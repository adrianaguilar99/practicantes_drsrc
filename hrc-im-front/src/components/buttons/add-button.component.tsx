import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import { GetUrl } from '../../functions/utils.functions'; 
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import { FormModal } from '../modals/form-modal.component';

export const AddButton = () => {
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
      {url !== "audits" && url !== "checkin-checkout" ? (
        <button className="add-button" onClick={handleClick}>
          Agregar
          {getIcon()}
        </button>
      ) : null}

      <FormModal 
        open={open} 
        onConfirm={handleClose} 
        onCancel={handleClose} 
        title="Agregar" 
        type="Add" 
        entity={url} 
        message={''} 
        
      />
    </>
  );
};
