import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import "../components.css";

interface ButtonComponentProps {
  text: string;
  onClick: () => void;  // Añadir onClick como prop
}

export const ButtonComponent = ({ text, onClick }: ButtonComponentProps) => {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleLoading = () => {
    if (!disabled) {
        onClick();  
      setLoading(true);
      setDisabled(true);

      setTimeout(() => {
        
        setLoading(false);
        setDisabled(false); 
      }, 1000);
    }
  };

  return (
    <Button
      variant="contained"
      onClick={handleLoading}
      disabled={disabled} // Deshabilitar el botón cuando sea necesario
      className="ButtonComponent"
      style={{
        fontFamily: '"Lato", sans-serif',
        fontWeight: 800,
        fontStyle: "normal",
        fontSize: "0.7rem",
      }}
    >
      {loading && (
        <CircularProgress
          size={20}
          color="inherit"
          style={{ marginRight: "8px" }}
        />
      )}
      {text}
    </Button>
  );
};


// Edit Button


export const EditButton = ({ onClick }: { onClick: () => void }) => {
  const [state, setState] = useState(false);  // Estado para alternar entre 'Guardar' y 'Editar'
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);


  const handleLoading = () => {
    if (!disabled) {
      if (state) {  
      } else {
        setLoading(true);
        setDisabled(true);
        setState(!state);
        setTimeout(() => {
          setLoading(false);
          setDisabled(false);
        }, 1000);
      }
      onClick();
    }
  };


  return (
    <>
      <Button
        variant="contained"
        className="EditButton"
        onClick={handleLoading}
        disabled={disabled} 
        style={{
          fontFamily: '"Lato", sans-serif',
          fontWeight: 800,
          fontStyle: "normal",
          fontSize: "0.7rem",
          backgroundColor: state ? "#1976d2" :  "#b88a54",
        }}
      >
        {loading && (
          <CircularProgress
            size={20}
            color="inherit"
            style={{ marginRight: "8px" }}
          />
        )}
        {state ? <p>Guardar</p> : <p>Editar</p>}
      </Button>
    </>
  );
};

