import { Box, Button } from "@mui/material";
import { RegisterRow } from "../../inputs/register-row.component";
import { enqueueSnackbar } from "notistack";
import { patchCareer, postCareer } from "../../../api/interns/careers/careers.api";
import { InputValidators } from "../../../functions/input-validators.functions";
import React, { useState } from "react";
import { FormModalProps } from "../../modals/form-modal.component";

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
              onChange={(value) => setCareerName(value as string || "")}
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
              onChange={(value) => setCareerName(value as string || "")}
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
                  bgcolor: "#D32F2F",
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
  