interface InfoRowProps {
  label: string;
  onChange?: (value?: string) => void;
  type?: "text" | "number" | "date" | "time" | "select" | "autocomplete";
  value?: string;
  id: string;
  options?: string[];
  coincidences?: string[];
  editable?: boolean;
  show?: boolean;
  }
  
  export const InfoRow: React.FC<InfoRowProps> = ({ label, value, id,type, editable, show }) => {
    return (
      <div className="info-row" style={{ display: show ? "flex" : "none" }}>
        <label htmlFor={id}>{label}</label>
          <input 
            type="text" 
           
            id={id} 
            typeof={type}
            defaultValue={value} 
            className={editable ? "edit-mode" : "view-mode"} 
            readOnly={!editable}
          />
      </div>
    );
  };
  