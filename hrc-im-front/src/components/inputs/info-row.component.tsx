import { useState } from "react";
import { formatPhoneNumber } from "../../functions/utils.functions";
import { Autocomplete, TextField } from "@mui/material";

interface InfoRowProps {
  label: string;
  onChange: (value?: string) => void;
  type?: "text" | "number" | "date" | "time" | "select" | "autocomplete" | "textarea" | "file" | "phone";
  value?: string;
  id: string;
  options?: string[];
  coincidences?: string[];
  validate?: "Error" | "Normal";
  editable?: boolean;
  show?: boolean;
  }
  
  export const InfoRow: React.FC<InfoRowProps> = ({ label, value, id,type, editable, show, onChange, options = [], coincidences = [],validate }) => {
    const [inputValue, setInputValue] = useState(value);
    const ValueChange = (newValue: string) => {
      setInputValue(newValue);
      onChange(newValue);
    };
  
    const errorClass = validate === "Error" ? "error-input" : "";

    return (
      <div className="info-row" style={{ display: show ? "flex" : "none" }}>
        <label htmlFor={id}>{label}</label>
        {type === "textarea" && (
         <textarea 
         id={id} 
         typeof={type}
         defaultValue={value} 
         className={editable ? "edit-mode" : "view-mode"} 
         readOnly={!editable}
       />
        ) }
        {type === "text" && (
                <input 
                type="text"
                value={value}
                id={id} 
                typeof={type}
                defaultValue={value} 
                onChange={(e) => ValueChange(e.target.value)}
                className={editable ? "edit-mode" : "view-mode"} 
                readOnly={!editable}
              />
        )}


            {type === "number" && (
            <input
              type="number"
              min={1}
              id={id}
              defaultValue={value}
              value={value}
              onChange={(e) => ValueChange(e.target.value)}
              className={`edit-mode ${errorClass}`}
              readOnly={!editable}
              typeof={type}
            />
          )}

          {type === "phone" && (
            <input
              type="tel"
              id={id}
              value={formatPhoneNumber(value || "")} 
              onChange={(e) => ValueChange(e.target.value)} 
              className={editable ? `edit-mode ${errorClass}` : "view-mode"} 
              readOnly={!editable} 
            />
          )}
          {type === "file" && (
            <input
              type="file"
              min={1}
              id={id}
              defaultValue={value}
              onChange={(e) => ValueChange(e.target.value)}
              className={editable ? `edit-mode ${errorClass}` : "view-mode"} 
              readOnly={!editable}
            />
          )}

          {type === "date" && (
            <input
              type="date"
              id={id}
              typeof={type}
              value={value}
              defaultValue={value}
              onChange={(e) => ValueChange(e.target.value)}
              className={editable ? `edit-mode ${errorClass}` : "view-mode"} 
              readOnly={!editable}
            />
          )}

          {type === "time" && (
            <input
              type="time"
              id={id}
              defaultValue={value}
              onChange={(e) => ValueChange(e.target.value)}
              className={editable ? `edit-mode ${errorClass}` : "view-mode"} 
              readOnly={!editable}
            />
          )}

          {type === "select" && (
            <select
              id={id}
              value={inputValue}
              onChange={(e) => ValueChange(e.target.value)}
                className={editable ? `edit-mode ${errorClass}` : "view-mode"} 
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
                    className: `${editable ? `edit-mode ${errorClass}` : "view-mode"} `,
                  }}
                  fullWidth
                />
              )}
              fullWidth
            />
          )}
        </div>
    );
  };
  