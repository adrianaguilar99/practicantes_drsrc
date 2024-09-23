import { useState } from "react";
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";

interface RegisterRowProps {
  label: string;
  onChange: (value?: string) => void;
  type?: "text" | "number" | "date" | "time" | "select" | "autocomplete";
  value?: string;
  id: string;
  show: boolean;
  options?: string[];
  coincidences?: string[];
}

export const RegisterRow: React.FC<RegisterRowProps> = ({
  label,
  value,
  id,
  onChange,
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

  // Función para manejar cambios y propagar al padre
  const handleChange = (newValue: string) => {
    setInputValue(newValue);
    onChange(newValue); // Envía el valor al componente padre
  };

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
              onChange={(e) => handleChange(e.target.value)} // Aquí llamamos a handleChange
              className="edit-mode"
            />
          )}
          {type === "number" && (
            <input
              type="number"
              id={id}
              defaultValue={value}
              onChange={(e) => handleChange(e.target.value)}
              className="edit-mode"
            />
          )}
          {type === "date" && (
            <input
              type="date"
              id={id}
              defaultValue={value}
              onChange={(e) => handleChange(e.target.value)}
              className="edit-mode"
            />
          )}
          {type === "time" && (
            <input
              type="time"
              id={id}
              defaultValue={value}
              onChange={(e) => handleChange(e.target.value)}
              className="edit-mode"
            />
          )}
          {type === "select" && (
            <select
              id={id}
              value={inputValue}
              onChange={(e) => handleChange(e.target.value)}
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
                "& .MuiInputBase-root": {
                  fontSize: ".75rem",
                  padding: "0 10px",
                  height: "40px",
                },
              }}
              value={inputValue}
              onInputChange={(event, newInputValue) => {
                handleChange(newInputValue); // Llamamos a handleChange aquí también
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    ...params.InputProps,
                    className: "edit-mode",
                    style: {
                      fontSize: ".75rem",
                      padding: "10px",
                      height: "40px",
                    },
                  }}
                  sx={{
                    fontSize: ".75rem",
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
