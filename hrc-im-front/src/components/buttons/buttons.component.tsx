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

  const Loading = () => {
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
      onClick={Loading}
      disabled={disabled} 
      className="ButtonComponent"
      style={{
        fontFamily: '"Lato", sans-serif',
        fontWeight: 800,
        fontStyle: "normal",
        fontSize: "0.7rem",
        minHeight: "40px",
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

interface EditButtonProps {
  onClick: () => void;
  editing?: boolean;
}

export const EditButton : React.FC<EditButtonProps> = ({ onClick , editing }) => {
  const [state, setState] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);


  const Loading = () => {
    if (!disabled) {
      if (state) {  
        setState(!state);
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
        onClick={Loading}
        disabled={disabled} 
        style={{
          fontFamily: '"Lato", sans-serif',
          fontWeight: 800,
          fontStyle: "normal",
          fontSize: "0.7rem",
          backgroundColor: editing ? "#1976d2" :  "#b88a54",
          minHeight: "30px",
          maxHeight: "40px",
        }}
      >
        {loading && (
          <CircularProgress
            size={20}
            color="inherit"
            style={{ marginRight: "8px" }}
          />
        )}
        {editing ? <p>Guardar</p> : <p>Editar</p>}
      </Button>
    </>
  );
};

