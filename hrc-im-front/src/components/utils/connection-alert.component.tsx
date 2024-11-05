import { useState, useEffect } from "react";
import '../components.css';
import { Slide } from "@mui/material";
import WifiOffRoundedIcon from '@mui/icons-material/WifiOffRounded';
import WifiRoundedIcon from '@mui/icons-material/WifiRounded';
import { io } from "socket.io-client";

export const ConnectionAlert = () => {
  const [connection, setConnection] = useState(true); 
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const socket = io('http://localhost:3000', {
      reconnectionAttempts: Infinity,
      reconnectionDelay: 2000,
      timeout: 5000,
    });

    socket.on('connect', () => {
      if (!connection) { 
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 6000);
      }
      setConnection(true);
    });

    socket.on('disconnect', () => {
      setConnection(false);
    });

    socket.on('reconnect_attempt', () => {
      console.log("Intentando reconectar...");
    });
    return () => {
      socket.disconnect();
    };
  }, []); 

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
