interface InfoRowProps {
    label: string;
    type?: string;
    value: string;
    id: string;
    editable: boolean;
    multiline?: boolean; // Nuevo prop para manejar campos multilínea
  }
  
  export const InfoRow: React.FC<InfoRowProps> = ({ label, value, id,type, editable, multiline = false }) => {
    return (
      <div className="info-row">
        <label htmlFor={id}>{label}</label>
        {multiline ? (
          <textarea
            id={id}
            defaultValue={value}
            className={editable ? "edit-mode" : "view-mode"}
            readOnly={!editable}
            rows={editable ? 4 : 1} // Define cuántas filas mostrar en modo edición
          />
        ) : (
          <input 
            type="text" 
            id={id} 
            typeof={type}
            defaultValue={value} 
            className={editable ? "edit-mode" : "view-mode"} 
            readOnly={!editable}
          />
        )}
      </div>
    );
  };
  