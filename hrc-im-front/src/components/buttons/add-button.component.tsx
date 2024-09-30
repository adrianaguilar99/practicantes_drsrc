import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirigir
import { Modal, Box, Typography, Button } from '@mui/material'; // Importar el Modal de MUI
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import { GetUrl } from '../../functions/utils.functions'; // Supongo que tienes esta función
import { ConfirmationModal } from '../modals/confirmation-modal.component';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import { FormModal } from '../modals/form-modal.component';

export const AddButton = () => {
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); // Hook para redirigir

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
    if (url.includes('interns')) {
      navigate('/interns/intern-register'); // Redirigir si la URL contiene 'interns'
    } else {
      handleOpen(); // Abrir el modal si no coincide con 'interns'
    }
  };

  // Función para obtener el ícono dependiendo de la URL
  const getIcon = () => {
    if (url === "departments") {
      return <DomainAddIcon />;
    } else if (url === "interns-institutions") {
      return <LocationCityOutlinedIcon />;
    } else if (url === "interns-carrers") {
      return <ReceiptLongOutlinedIcon />;
    } else {
      return <PersonAddAlt1OutlinedIcon />;
    }
  };

  return (
    <>
      {/* No mostrar el botón en estas URLs específicas */}
      {url !== "audits" && url !== "checkin-checkout" ? (
        <button className="add-button" onClick={handleClick}>
          Agregar
          {getIcon()} {/* Mostrar el ícono correspondiente */}
        </button>
      ) : null}

      {/* Modal para agregar */}
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
