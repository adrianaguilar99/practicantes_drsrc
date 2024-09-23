import { Box, Button } from "@mui/material";
import { RegisterRow } from "../interns/interns-components/register-row.component";

interface FormModalProps {
  type: string;
  data?: any;
  onCancel?: () => void;
}

export const DepartmentFormModal: React.FC<FormModalProps> = ({ type, data , onCancel }) => {
  return (
    <>
      {type === "Edit"  ? (
        <div className="form-modal">
            <label>Nombre del departamento: </label>
          <input type="text" defaultValue={data}  className="form-modal-input"/>
          <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{
                  bgcolor: '#007BFF',
                  '&:hover': { bgcolor: '#0056b3' },
                }}
              >
                Agregar
              </Button>
  
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  bgcolor: '#A0522D',
                  '&:hover': { bgcolor: '#8b4513' },
                }}
              >
                Cancelar
              </Button>
            </Box>
        </div>
      ) : (
        <div className="form-modal">
            <label>Nombre del departamento: </label>
          <input type="text" className="form-modal-input" />
          <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{
                  bgcolor: '#007BFF',
                  '&:hover': { bgcolor: '#0056b3' },
                }}
              >
                Agregar
              </Button>
  
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  bgcolor: '#A0522D',
                  '&:hover': { bgcolor: '#8b4513' },
                }}
               
              >
                Cancelar
              </Button>
            </Box>
        </div>
      )}
    </>
  );
};


export const SupervisorFormModal: React.FC<FormModalProps> = ({ type, data, onCancel }) => {
    return (
      <>
        {type === "Edit" ? (
          <div className="form-modal">
            <RegisterRow label="Nombre del encargado" value={data} type="text" id={""} show={true} />
            <RegisterRow label="Correo del encargado" value={data} type="text" id={""} show={true} />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{
                  bgcolor: '#007BFF',
                  '&:hover': { bgcolor: '#0056b3' },
                }}
              >
                Aceptar
              </Button>
  
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  bgcolor: '#A0522D',
                  '&:hover': { bgcolor: '#8b4513' },
                }}
                onClick={onCancel} // Asegúrate de que onCancel esté aquí
              >
                Cancelar
              </Button>
            </Box>
          </div>
        ) : (
          <div className="form-modal">
            <RegisterRow label="Nombre del encargado" value={data} type="text" id={""} show={true} />
            <RegisterRow label="Correo del encargado" value={data} type="text" id={""} show={true} />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{
                  bgcolor: '#007BFF',
                  '&:hover': { bgcolor: '#0056b3' },
                }}
              >
                Agregar
              </Button>
  
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  bgcolor: '#A0522D',
                  '&:hover': { bgcolor: '#8b4513' },
                }}
                onClick={onCancel} // Asegúrate de que onCancel esté aquí
              >
                Cancelar
              </Button>
            </Box>
          </div>
        )}
      </>
    );
  };
  