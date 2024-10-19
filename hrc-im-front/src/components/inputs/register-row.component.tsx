import { useState } from "react";
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";

interface RegisterRowProps {
  label: string;
  onChange: (value?: string) => void;
  type?: "text" | "number" | "date" | "time" | "select" | "autocomplete" | "file";
  value?: string;
  id: string;
  validate?: "Error" | "Normal";
  typeError?: String;
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
  validate, 
  typeError,
  options = [],
  coincidences = [],
}) => {
  const [inputValue, setInputValue] = useState(value);

  const animationStyles = useSpring({
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0px)" : "translateY(20px)",
    config: { tension: 280, friction: 10 },
  });

  const ValueChange = (newValue: string) => {
    setInputValue(newValue);
    onChange(newValue);
  };

  const errorClass = validate === "Error" ? "error-input" : "";

  return (
    show && (
      <animated.div style={animationStyles}>
          {validate === "Error" && (
            <label htmlFor={id} className="error-label">
              {typeError}
            </label>
          )}
        <div className="info-row">
          <label htmlFor={id}>{label}</label>

          {type === "text" && (
            <input
              type="text"
              id={id}
              defaultValue={value}
              onChange={(e) => ValueChange(e.target.value)}
              className={`edit-mode ${errorClass}`} 
            />
          )}

          {type === "number" && (
            <input
              type="number"
              min={1}
              id={id}
              defaultValue={value}
              onChange={(e) => ValueChange(e.target.value)}
              className={`edit-mode ${errorClass}`}
            />
          )}
           {type === "file" && (
            <input
              type="file"
              min={1}
              id={id}
              defaultValue={value}
              onChange={(e) => ValueChange(e.target.value)}
              className={`edit-mode ${errorClass}`}
            />
          )}

          {type === "date" && (
            <input
              type="date"
              id={id}
              defaultValue={value}
              onChange={(e) => ValueChange(e.target.value)}
              className={`edit-mode ${errorClass}`}
            />
          )}

          {type === "time" && (
            <input
              type="time"
              id={id}
              defaultValue={value}
              onChange={(e) => ValueChange(e.target.value)}
              className={`edit-mode ${errorClass}`}
            />
          )}

          {type === "select" && (
            <select
              id={id}
              value={inputValue}
              onChange={(e) => ValueChange(e.target.value)}
              className={`edit-mode ${errorClass}`}
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
              value={inputValue}
              
              onInputChange={(event, newInputValue) => {
                ValueChange(newInputValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    ...params.InputProps,
                    className: `edit-mode ${errorClass}`,
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
