import { Box, Button } from "@mui/material";
import { RegisterRow } from "../inputs/register-row.component";
import React, { useState } from "react";
import { set, sub } from "date-fns";
import { enqueueSnackbar } from "notistack";
import { patchCareer, postCareer } from "../../api/interns/careers/careers.api";
import { ButtonComponent } from "../buttons/buttons.component";
import {
  patchInstitution,
  postInstitution,
} from "../../api/interns/institutions/institutions.api";
import { InputValidators } from "../../functions/input-validators.functions";
import { patchDepartment, postDepartment } from "../../api/departments/departments.api";

interface FormModalProps {
  type: string;
  data?: any;
  onCancel: () => void;
  onSuccess: () => void;
}

export const DepartmentFormModal: React.FC<FormModalProps> = ({
  type,
  data,
  onCancel,
  onSuccess
}) => {
  const DepartmentId = data?.id;
  const [DepartmentName, setDepartmentName] = React.useState<string>(data?.name || "");

  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({
    departmentName: undefined,
  });

  const ValidateInputs = () => {
    const validators = InputValidators();
    const newErrors: { [key: string]: string | undefined } = {};

    const resultName = validators.string(DepartmentName);
    if (resultName) {
      newErrors.departmentName = resultName;
    }
    setErrors(newErrors);
  };

  const SubmitForm = () => {
    const validators = InputValidators();
    const newErrors: { [key: string]: string | undefined } = {};
    const resultName = validators.string(DepartmentName);
    if (resultName) {
      newErrors.departmentName = resultName;
    }
    setErrors(newErrors);
    if (!newErrors.deparmentName) {
      const userToken = sessionStorage.getItem("_Token") || "";

      if (type === "Edit") {
        patchDepartment(userToken, DepartmentId, {
          name: DepartmentName,
        })
          .then((data) => {
            if (data) {
              enqueueSnackbar("Departamento actualizado correctamente", {
                variant: "success",
              });
              onSuccess();
              onCancel();
            }
          })
          .catch((error) => {
            enqueueSnackbar(
              "Error al actualizar la información del departamento: " + error,
              { variant: "error" }
            );
          });
      } else {
        postDepartment(userToken, {
          name: DepartmentName
        })
          .then((data) => {
            if (data) {
              enqueueSnackbar("Departamento agregado correctamente", {
                variant: "success",
              });
              onSuccess();
              onCancel();
            }
          })
          .catch((error) => {
            enqueueSnackbar("Error al agregar el departamento: " + error, {
              variant: "error",
            });
          });
      }
    }
  };

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
            <div style={{ maxWidth: "70%" }}>
              <ButtonComponent text="Aceptar" onClick={SubmitForm} />
            </div>

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
            <div style={{ maxWidth: "70%" }}>
              <ButtonComponent text="Aceptar" onClick={SubmitForm} />
            </div>

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
  const [SupervisorName, setSupervisorName] = useState<string>("");
  const [SupervisorEmail, setSupervisorEmail] = useState<string>("");
  const [SupervisorPhone, setSupervisorPhone] = useState<string>("");
  const [SupervisorRol, setSupervisorRol] = useState<string>("");
  const [SupervisorDepartment, setSupervisorDepartment] = useState<string>("");

  return (
    <>
      {type === "Edit" ? (
        <div className="form-modal">
          <RegisterRow
            label="Nombre del usuario"
            value={data.name}
            type="text"
            id={"supervisorName"}
            show={true}
            onChange={(value) => setSupervisorName(value || "")}
          />
          <RegisterRow
            label="Correo del usuario"
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
              marginBottom: "5%",
            }}
          >
            <RegisterRow
              label="Teléfono del usuario"
              value={data.phone || ""}
              type="number"
              id={"supervisorPhone"}
              show={true}
              onChange={(value) => setSupervisorPhone(value || "")}
            />
            <RegisterRow
              label="Permisos del usuario"
              value={data.rol || ""}
              options={["SUPERVISOR", "SUPERVISOR RH", "ADMINISTRADOR"]}
              type="select"
              id={"supervisorRol"}
              show={true}
              onChange={(value) => setSupervisorRol(value || "")}
            />
          </Box>

       
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
            label="Nombre del usuario"
            type="text"
            id={""}
            show={true}
            onChange={(value) => setSupervisorName(value || "")}
          />
          <RegisterRow
            label="Correo del usuario"
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
              marginBottom: "5%",
            }}
          >
            <RegisterRow
              label="Teléfono del usuario"
              type="number"
              id={"supervisorPhone"}
              show={true}
              onChange={(value) => setSupervisorPhone(value || "")}
            />
            <RegisterRow
              label="Permisos del usuario"
              options={["SUPERVISOR", "SUPERVISOR RH", "ADMINISTRADOR"]}
              type="select"
              id={"supervisorRol"}
              show={true}
              onChange={(value) => setSupervisorRol(value || "")}
            />
          </Box>

        
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

  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({
    institutionName: undefined,
    institutionPhone: undefined,
  });

  const ValidateInputs = () => {
    const validators = InputValidators();
    const newErrors: { [key: string]: string | undefined } = {};

    const resultName = validators.string(InstitutionName);
    if (resultName) {
      newErrors.institutionName = resultName;
    }
    const resultPhone = validators.phone(InstitutionPhone);
    if (resultPhone) {
      newErrors.institutionPhone = resultPhone;
    }
    setErrors(newErrors);
  };

  const SubmitForm = () => {
    const validators = InputValidators();
    const newErrors: { [key: string]: string | undefined } = {};
    const resultName = validators.string(InstitutionName);
    const resultPhone = validators.phone(InstitutionPhone);
    if (resultName) {
      newErrors.institutionName = resultName;
    }
    if (resultPhone) {
      newErrors.institutionPhone = resultPhone;
    }
    setErrors(newErrors);
    if (!newErrors.institutionName && !newErrors.institutionPhone) {
      const userToken = sessionStorage.getItem("_Token") || "";

      if (type === "Edit") {
        patchInstitution(userToken, InstitutionId, {
          name: InstitutionName,
          phone: InstitutionPhone,
        })
          .then((data) => {
            if (data) {
              enqueueSnackbar("Institución actualizada correctamente", {
                variant: "success",
              });
              onSuccess();
              onCancel();
            }
          })
          .catch((error) => {
            enqueueSnackbar(
              "Error al actualizar la información de la institución: " + error,
              { variant: "error" }
            );
          });
      } else {
        postInstitution(userToken, {
          name: InstitutionName,
          phone: InstitutionPhone,
        })
          .then((data) => {
            if (data) {
              enqueueSnackbar("Institución agregada correctamente", {
                variant: "success",
              });
              onSuccess();
              onCancel();
            }
          })
          .catch((error) => {
            enqueueSnackbar("Error al agregar la institución: " + error, {
              variant: "error",
            });
          });
      }
    }
  };

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
            validate={errors.institutionName ? "Error" : "Normal"}
            typeError={errors.institutionName}
          />
          <RegisterRow
            label="Telefono de la institución"
            value={data.phone}
            type="number"
            id={"institutionEmail"}
            show={true}
            onChange={(value) => setInstitutionPhone(value || "")}
            validate={errors.institutionPhone ? "Error" : "Normal"}
            typeError={errors.institutionPhone}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ maxWidth: "70%" }}>
              <ButtonComponent text="Aceptar" onClick={SubmitForm} />
            </div>

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
            validate={errors.institutionName ? "Error" : "Normal"}
            typeError={errors.institutionName}
          />
          <RegisterRow
            label="Telefono de la institución"
            type="number"
            id={""}
            show={true}
            onChange={(value) => setInstitutionPhone(value || "")}
            validate={errors.institutionPhone ? "Error" : "Normal"}
            typeError={errors.institutionPhone}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ maxWidth: "70%" }}>
              <ButtonComponent text="Aceptar" onClick={SubmitForm} />
            </div>

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

  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({
    careerName: undefined,
  });

  const ValidateInputs = () => {
    const validators = InputValidators();
    const newErrors: { [key: string]: string | undefined } = {};

    const resultName = validators.string(CareerName);
    if (resultName) {
      newErrors.careerName = resultName;
    }
    setErrors(newErrors);
  };

  const SubmitForm = () => {
    const validators = InputValidators();
    const newErrors: { [key: string]: string | undefined } = {};
    const resultName = validators.string(CareerName);
    if (resultName) {
      newErrors.careerName = resultName;
    }
    setErrors(newErrors);
    if (!newErrors.careerName) {
      const userToken = sessionStorage.getItem("_Token") || "";

      if (type === "Edit") {
        patchCareer(userToken, CareerId, {
          name: CareerName,
        })
          .then((data) => {
            if (data) {
              enqueueSnackbar("Carrera actualizada correctamente", {
                variant: "success",
              });
              onSuccess();
              onCancel();
            }
          })
          .catch((error) => {
            enqueueSnackbar(
              "Error al actualizar la información de la carrera: " + error,
              { variant: "error" }
            );
          });
      } else {
        postCareer(userToken, {
          name: CareerName,
        })
          .then((data) => {
            if (data) {
              enqueueSnackbar("Carrera agregada correctamente", {
                variant: "success",
              });
              onSuccess();
              onCancel();
            }
          })
          .catch((error) => {
            enqueueSnackbar("Error al agregar la carrera: " + error, {
              variant: "error",
            });
          });
      }
    }
  };

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
            validate={errors.careerName ? "Error" : "Normal"}
            typeError={errors.careerName}
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
              onClick={SubmitForm}
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
            validate={errors.careerName ? "Error" : "Normal"}
            typeError={errors.careerName}
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
              onClick={SubmitForm}
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
