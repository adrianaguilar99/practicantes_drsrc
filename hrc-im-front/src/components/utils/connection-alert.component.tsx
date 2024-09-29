import { useState, useEffect } from "react";
import '../components.css';
import { Slide } from "@mui/material";

export const ConnectionAlert = () => {
  const [connection, setConnection] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/tests/ok");
        if (response.ok) {
          setConnection(true);  // Conexión exitosa
        } else {
          setConnection(false); // Respuesta sin éxito
        }
      } catch (error) {
        setConnection(false);   // Error de conexión
      }
    };

    // Verificar conexión cada 10 segundos (10000 ms)
    const interval = setInterval(checkConnection, 10000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);

  if (connection) {
    return null; // No mostrar nada si hay conexión
  }

  return (
    <Slide direction="up" in={!connection} mountOnEnter unmountOnExit>
  <div className="connection-alert">
      <p>No se pudo establecer conexión con el servidor</p>
    </div>
</Slide>
    
  );
};

