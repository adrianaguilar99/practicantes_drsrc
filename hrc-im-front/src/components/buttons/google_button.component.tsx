import { useNavigate } from 'react-router-dom';
import '../components.css';
import { hr } from 'date-fns/locale';
import { useEffect } from 'react';
import { SnackbarProvider, VariantType, enqueueSnackbar, useSnackbar } from 'notistack';

interface GoogleButtonProps {
  onClick: () => void;
}

export const GoogleButtonComponent: React.FC<GoogleButtonProps> = ({ onClick}) => {
  


  
  return (
    <button className="google-btn" onClick={onClick}>
      <img
        src="https://w7.pngwing.com/pngs/326/85/png-transparent-google-logo-google-text-trademark-logo-thumbnail.png"
        alt="Google icon"
        className="google-icon"
      />
      Continuar con Google
    </button>
  );
};
