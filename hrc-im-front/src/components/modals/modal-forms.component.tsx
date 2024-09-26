import { Box, Button } from "@mui/material";
import { RegisterRow } from "../inputs/register-row.component";
import React, { useState } from "react";
import { set } from "date-fns";

interface FormModalProps {
  type: string;
  data?: any;
  onCancel?: () => void;
}

export const DepartmentFormModal: React.FC<FormModalProps> = ({ type, data , onCancel }) => {
 const [DepartmentName, setDepartmentName] = React.useState<string>("");



  return (
    <>
      {type === "Edit"  ? (
        <div className="form-modal">
            <RegisterRow label="Nombre del departamento" value={data.name} type="text" id={"DepartmentName"} show={true} onChange={(value) => setDepartmentName(value || "")}/>
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
            <RegisterRow label="Nombre del departamento"  type="text" id={"DepartmentName"} show={true} onChange={(value) => setDepartmentName(value || "")}/>
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
                onClick={onCancel}
               
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
  const [SupervisorName, setSupervisorName] = React.useState<string>("");
  const [SupervisorEmail, setSupervisorEmail] = React.useState<string>("");
  const [SupervisorDepartment, setSupervisorDepartment] = React.useState<string>("");


    return (
      <>
        {type === "Edit" ? (
          <div className="form-modal">
            <RegisterRow label="Nombre del encargado" value={data.name} type="text" id={"supervisorName"} show={true}  onChange={(value) => setSupervisorName(value || "")}/>
            <RegisterRow label="Correo del encargado" value={data.email} type="text" id={"supervisorEmail"} show={true} onChange={(value) => setSupervisorEmail(value || "")}/>
            <RegisterRow label="Departamento" value={data.department} options={["Departamento 1", "Departamento 2"]} type="select" id={"supervisorDepartment"} show={true} onChange={(value) => setSupervisorDepartment(value || "")}/>
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
            <RegisterRow label="Nombre del encargado" type="text" id={""} show={true} onChange={(value) => setSupervisorName(value || "")} />
            <RegisterRow label="Correo del encargado" type="text" id={""} show={true} onChange={(value) => setSupervisorEmail(value || "")}/>
            <RegisterRow label="Departamento" type="select" id={""} show={true} onChange={(value) => setSupervisorDepartment(value || "")}/>
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
  