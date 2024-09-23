import { useState } from "react";
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";

interface RegisterRowProps {
  label: string;
  type?: "text" | "number" | "date" | "time" | "select" | "autocomplete";
  value: string;
  id: string;
  show: boolean;
  options?: string[];
  coincidences?: string[];
}

export const RegisterRow: React.FC<RegisterRowProps> = ({
  label,
  value,
  id,
  type,
  show,
  options = [],
  coincidences = [],
}) => {
  const [inputValue, setInputValue] = useState(value);

  const animationStyles = useSpring({
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0px)" : "translateY(20px)",
    config: { tension: 280, friction: 10 },
  });

  return (
    show && (
      <animated.div style={animationStyles}>
        <div className="info-row">
          <label htmlFor={id}>{label}</label>
          {type === "text" && (
            <input
              type="text"
              id={id}
              defaultValue={value}
              onChange={(e) => setInputValue(e.target.value)}
              className="edit-mode"
            />
          )}
          {type === "number" && (
            <input
              type="number"
              id={id}
              defaultValue={value}
              onChange={(e) => setInputValue(e.target.value)}
              className="edit-mode"
            />
          )}
          {type === "date" && (
            <input
              type="date"
              id={id}
              defaultValue={value}
              onChange={(e) => setInputValue(e.target.value)}
              className="edit-mode"
            />
          )}
          {type === "time" && (
            <input
              type="time"
              id={id}
              defaultValue={value}
              onChange={(e) => setInputValue(e.target.value)}
              className="edit-mode"
            />
          )}
          {type === "select" && (
            <select
              id={id}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="edit-mode"
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
          {type === "autocomplete" && (
            <Autocomplete
            options={coincidences}
            sx={{ 
              '& .MuiInputBase-root': { // Estilos para la base del input
                fontSize: '.85rem', // Tamaño de fuente del Autocomplete
                padding: '0 10px',  // Padding horizontal
                height: '40px',     // Altura fija para alinearse con otros inputs
              },
            }}
            value={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                size="small" 
                InputProps={{
                  ...params.InputProps,
                  className: 'edit-mode',
                  style: {
                    fontSize: '.85rem',  
                    padding: '10px',    
                    height: '40px',      
                  },
                }}
                sx={{
                  fontSize: '.85rem', 
                }}
                fullWidth
              />
            )}
            fullWidth
          />
          
          
          )}
        </div>
      </animated.div>
    )
  );
};
