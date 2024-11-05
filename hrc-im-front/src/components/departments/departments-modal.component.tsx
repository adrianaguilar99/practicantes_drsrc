import { useState } from "react";
import { InputValidators } from "../../functions/input-validators.functions";
import React from "react";
import { ButtonComponent } from "../buttons/buttons.component";
import { Box, Button } from "@mui/material";
import { RegisterRow } from "../inputs/register-row.component";
import { enqueueSnackbar } from "notistack";
import { patchDepartment, postDepartment } from "../../api/departments/departments.api";
import { FormModalProps } from "../modals/form-modal.component";

export const DepartmentFormModal: React.FC<FormModalProps> = ({
    type,
    data,
    onCancel,
    onSuccess,
  }) => {
    const DepartmentId = data?.id;
    const [DepartmentName, setDepartmentName] = React.useState<string>(
      data?.name || ""
    );
  
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
            name: DepartmentName,
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
              onChange={(value) => setDepartmentName(value as string || "")}
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
              onChange={(value) => setDepartmentName(value as string || "")}
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