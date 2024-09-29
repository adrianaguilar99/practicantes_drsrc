import { useState, useEffect } from "react";
import '../components.css';
import { Slide } from "@mui/material";
import WifiOffRoundedIcon from '@mui/icons-material/WifiOffRounded';
import WifiRoundedIcon from '@mui/icons-material/WifiRounded';

export const ConnectionAlert = () => {
  const [connection, setConnection] = useState(true);   // Estado de conexión actual
  const [showSuccess, setShowSuccess] = useState(false); // Estado para mostrar la alerta de éxito

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/tests/ok");
        if (response.ok) {
          if (!connection) { 
            setShowSuccess(true); 
            setTimeout(() => setShowSuccess(false), 3000); 
          }
          setConnection(true); 
        } else {
          setConnection(false); 
        }
      } catch (error) {
        setConnection(false);   
      }
    };

    const interval = setInterval(checkConnection, 10000);

    return () => clearInterval(interval); 
  }, [connection]);

  return (
    <>
      <Slide direction="up" in={!connection} mountOnEnter unmountOnExit>
        <div className="connection-alert-error">
          <div className="connection-alert-error-content">
          <WifiOffRoundedIcon />
          <p>No es posible establecer conexión con el servidor</p>
          </div>
        </div>
      </Slide>

      <Slide direction="up" in={showSuccess} mountOnEnter unmountOnExit>
        <div className="connection-alert-success">
        <div className="connection-alert-success-content">
          <WifiRoundedIcon />
          <p>Se ha restablecido la conexión con el servidor</p>
          </div>
        </div>
      </Slide>
    </>
  );
};
