import { Box, Button } from "@mui/material";
import { RegisterRow } from "../inputs/register-row.component";
import React, { useState } from "react";
import { set } from "date-fns";
import { enqueueSnackbar } from "notistack";
import { patchCareer, postCareer } from "../../api/interns/careers/careers.api";
import { ButtonComponent } from "../buttons/buttons.component";
import { patchInstitution, postInstitution } from "../../api/interns/institutions/institutions.api";

interface FormModalProps {
  type: string;
  data?: any;
  onCancel: () => void;
  onSuccess: () => void; // Nueva prop para notificar al padre
}

export const DepartmentFormModal: React.FC<FormModalProps> = ({
  type,
  data,
  onCancel,
}) => {
  const [DepartmentName, setDepartmentName] = React.useState<string>("");

  return (
    <>
      {type === "Edit" ? (
        <div className="form-modal">
          <RegisterRow
            label="Nombre del departamento"
            value={data.name}
            type="text"
            id={"DepartmentName"}
            show={true}
            onChange={(value) => setDepartmentName(value || "")}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                bgcolor: "#007BFF",
                "&:hover": { bgcolor: "#0056b3" },
              }}
            >
              Agregar
            </Button>

            <Button
              variant="contained"
              color="secondary"
              sx={{
                bgcolor: "#A0522D",
                "&:hover": { bgcolor: "#8b4513" },
              }}
              onClick={onCancel}
            >
              Cancelar
            </Button>
          </Box>
        </div>
      ) : (
        <div className="form-modal">
          <RegisterRow
            label="Nombre del departamento"
            type="text"
            id={"DepartmentName"}
            show={true}
            onChange={(value) => setDepartmentName(value || "")}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                bgcolor: "#007BFF",
                "&:hover": { bgcolor: "#0056b3" },
              }}
            >
              Agregar
            </Button>

            <Button
              variant="contained"
              color="secondary"
              sx={{
                bgcolor: "#A0522D",
                "&:hover": { bgcolor: "#8b4513" },
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

export const SupervisorFormModal: React.FC<FormModalProps> = ({
  type,
  data,
  onCancel,
}) => {
  const [SupervisorName, setSupervisorName] = React.useState<string>("");
  const [SupervisorEmail, setSupervisorEmail] = React.useState<string>("");
  const [SupervisorDepartment, setSupervisorDepartment] =
    React.useState<string>("");

  return (
    <>
      {type === "Edit" ? (
        <div className="form-modal">
          <RegisterRow
            label="Nombre del encargado"
            value={data.name}
            type="text"
            id={"supervisorName"}
            show={true}
            onChange={(value) => setSupervisorName(value || "")}
          />
          <RegisterRow
            label="Correo del encargado"
            value={data.email}
            type="text"
            id={"supervisorEmail"}
            show={true}
            onChange={(value) => setSupervisorEmail(value || "")}
          />
          <RegisterRow
            label="Departamento"
            value={data.department}
            options={["Departamento 1", "Departamento 2"]}
            type="select"
            id={"supervisorDepartment"}
            show={true}
            onChange={(value) => setSupervisorDepartment(value || "")}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                bgcolor: "#007BFF",
                "&:hover": { bgcolor: "#0056b3" },
              }}
            >
              Aceptar
            </Button>

            <Button
              variant="contained"
              color="secondary"
              sx={{
                bgcolor: "#A0522D",
                "&:hover": { bgcolor: "#8b4513" },
              }}
              onClick={onCancel}
            >
              Cancelar
            </Button>
          </Box>
        </div>
      ) : (
        <div className="form-modal">
          <RegisterRow
            label="Nombre del encargado"
            type="text"
            id={""}
            show={true}
            onChange={(value) => setSupervisorName(value || "")}
          />
          <RegisterRow
            label="Correo del encargado"
            type="text"
            id={""}
            show={true}
            onChange={(value) => setSupervisorEmail(value || "")}
          />
          <RegisterRow
            label="Departamento"
            type="select"
            id={""}
            show={true}
            onChange={(value) => setSupervisorDepartment(value || "")}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                bgcolor: "#007BFF",
                "&:hover": { bgcolor: "#0056b3" },
              }}
            >
              Agregar
            </Button>

            <Button
              variant="contained"
              color="secondary"
              sx={{
                bgcolor: "#A0522D",
                "&:hover": { bgcolor: "#8b4513" },
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

//MODAL FORM DE INSITUTUCIONES

export const InstitutionFormModal: React.FC<FormModalProps> = ({
  type,
  data,
  onSuccess, 
  onCancel,
}) => {
  const InstitutionId = data?.id;
  const [InstitutionName, setInstitutionName] = React.useState<string>(data?.name || "");
  const [InstitutionPhone, setInstitutionPhone] = React.useState<string>(data?.phone || "");
  const userToken = sessionStorage.getItem("_Token") || "";
  return (
    <>
      {type === "Edit" ? (
        <div className="form-modal">
          <RegisterRow
            label="Nombre de la institución"
            value={data.name}
            type="text"
            id={"institutionName"}
            show={true}
            onChange={(value) => setInstitutionName(value || "")}
          />
          <RegisterRow
            label="Telefono de la institución"
            value={data.phone}
            type="number"
            id={"institutionEmail"}
            show={true}
            onChange={(value) => setInstitutionPhone(value || "")}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <ButtonComponent text="Aceptar" onClick={() => {
                if (InstitutionName && InstitutionPhone) {
                  patchInstitution(userToken, InstitutionId, {
                    name: InstitutionName,
                    phone: InstitutionPhone,
                    status: "ACCEPTED",
                  })
                    .then((data) => {
                     
                      if (data) {
                        enqueueSnackbar('Institución actualizada correctamente', { variant: 'success' });
                        onSuccess(); 
                        onCancel(); 
                      }
                    })
                    .catch((error) => {
                      console.log(data?.id);
                      console.error("Error al actualizar la información de la institución:", error);
                      enqueueSnackbar("Error al actualizar la información de la institución: " + error, { variant: 'error' }); 
                    });
                }
              }}/>

            <Button
              variant="contained"
              color="secondary"
              sx={{
                bgcolor: "#A0522D",
                "&:hover": { bgcolor: "#8b4513" },
              }}
              onClick={onCancel}
            >
              Cancelar
            </Button>
          </Box>
        </div>
      ) : (
        <div className="form-modal">
          <RegisterRow
            label="Nombre de la institución"
            type="text"
            id={""}
            show={true}
            onChange={(value) => setInstitutionName(value || "")}
          />
          <RegisterRow
            label="Telefono de la institución"
            type="number"
            id={""}
            show={true}
            onChange={(value) => setInstitutionPhone(value || "")}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
             <ButtonComponent text="Aceptar" onClick={() => {
                if (InstitutionName && InstitutionPhone) {
                  postInstitution(userToken, {
                    name: InstitutionName,
                    phone: InstitutionPhone,
                    status: "ACCEPTED",
                  })
                    .then((data) => {
                      if (data) {
                        enqueueSnackbar('Institucion agregada correctamente', { variant: 'success' });
                        onSuccess(); 
                        onCancel(); 
                      }
                    })
                    .catch((error) => {
                      console.error("Error al agregar la institucion:", error);
                      enqueueSnackbar("Error al agregar la institucion: " + error, { variant: 'error' }); 
                    });
                }
              }}/>

            <Button
              variant="contained"
              color="secondary"
              sx={{
                bgcolor: "#A0522D",
                "&:hover": { bgcolor: "#8b4513" },
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

//MODAL FORM DE CARRERAS


export const CareerFormModal: React.FC<FormModalProps> = ({
  type,
  data,
  onCancel,
  onSuccess, 
}) => {
  const CareerId = data?.id;
  const [CareerName, setCareerName] = React.useState<string>(data?.name || "");
  const userToken = sessionStorage.getItem("_Token") || "";

  return (
    <>
      {type === "Edit" ? (
        <div className="form-modal">
          <RegisterRow
            label="Nombre de la carrera"
            value={data?.name || ""}
            type="text"
            id={"CareerName"}
            show={true}
            onChange={(value) => setCareerName(value || "")}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                bgcolor: "#007BFF",
                "&:hover": { bgcolor: "#0056b3" },
              }}
              onClick={() => {
                if (CareerName) {
                  patchCareer(userToken, CareerId, {
                    name: CareerName,
                    status: "ACCEPTED",
                  })
                    .then((data) => {
                     
                      if (data) {
                        enqueueSnackbar('Carrera actualizada correctamente', { variant: 'success' });
                        onSuccess(); 
                        onCancel(); 
                      }
                    })
                    .catch((error) => {
                      console.log(data?.id);
                      console.error("Error al actualizar la carrera:", error);
                      enqueueSnackbar("Error al actualizar la carrera: " + error, { variant: 'error' }); 
                    });
                }
              }}
            >
              Aceptar
            </Button>

            <Button
              variant="contained"
              color="secondary"
              sx={{
                bgcolor: "#A0522D",
                "&:hover": { bgcolor: "#8b4513" },
              }}
              onClick={onCancel}
            >
              Cancelar
            </Button>
          </Box>
        </div>
      ) : (
        <div className="form-modal">
          <RegisterRow
            label="Nombre de la carrera"
            type="text"
            id={""}
            show={true}
            onChange={(value) => setCareerName(value || "")}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                bgcolor: "#007BFF",
                "&:hover": { bgcolor: "#0056b3" },
              }}
              onClick={() => {
                if (CareerName) {
                  postCareer(userToken, {
                    name: CareerName,
                    status: "ACCEPTED",
                  })
                    .then((data) => {
                      if (data) {
                        enqueueSnackbar('Carrera agregada correctamente', { variant: 'success' });
                        onSuccess(); 
                        onCancel(); 
                      }
                    })
                    .catch((error) => {
                      console.error("Error al agregar la carrera:", error);
                      enqueueSnackbar("Error al agregar la carrera: " + error, { variant: 'error' }); 
                    });
                }
              }}
              
            >
              Agregar
            </Button>

            <Button
              variant="contained"
              color="secondary"
              sx={{
                bgcolor: "#A0522D",
                "&:hover": { bgcolor: "#8b4513" },
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
