import { useState } from "react";
import { InputValidators } from "../../functions/input-validators.functions";
import React from "react";
import { ButtonComponent } from "../buttons/buttons.component";
import { Box, Button } from "@mui/material";
import { RegisterRow } from "../inputs/register-row.component";
import { enqueueSnackbar } from "notistack";
import { FormModalProps } from "../modals/form-modal.component";
import { patchProperty, postProperty } from "../../api/properties/propertie.api";

export const PropertiesFormModal: React.FC<FormModalProps> = ({
    type,
    data,
    onCancel,
    onSuccess,
  }) => {
    const PropertieId = data?.id;
    const [PropertieName, setPropertieName] = React.useState<string>(
      data?.name || ""
    );
  
    const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({
        propertieName: undefined,
    });
  
    const ValidateInputs = () => {
      const validators = InputValidators();
      const newErrors: { [key: string]: string | undefined } = {};
  
      const resultName = validators.string(PropertieName);
      if (resultName) {
        newErrors.propertieName = resultName;
      }
      setErrors(newErrors);
    };
  
    const SubmitForm = () => {
      const validators = InputValidators();
      const newErrors: { [key: string]: string | undefined } = {};
      const resultName = validators.string(PropertieName);
      if (resultName) {
        newErrors.propertieName = resultName;
      }
      setErrors(newErrors);
      if (!newErrors.propertieName) {
        const userToken = sessionStorage.getItem("_Token") || "";
  
        if (type === "Edit") {
          patchProperty(userToken, PropertieId, {
            name: PropertieName,
          })
            .then((data) => {
              if (data) {
                enqueueSnackbar("Propiedad actualizada correctamente", {
                  variant: "success",
                });
                onSuccess();
                onCancel();
              }
            })
            .catch((error) => {
              enqueueSnackbar(
                "Error al actualizar la información de la propiedad: " + error,
                { variant: "error" }
              );
            });
        } else {
          postProperty(userToken, {
            name: PropertieName,
          })
            .then((data) => {
              if (data) {
                enqueueSnackbar("Propiedad agregada correctamente", {
                  variant: "success",
                });
                onSuccess();
                onCancel();
              }
            })
            .catch((error) => {
              enqueueSnackbar("Error al agregar la propiedad: " + error, {
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
              label="Nombre de la propiedad"
              value={data.name}
              type="text"
              id={"PropertieName"}
              show={true}
              onChange={(value) => setPropertieName(value as string || "")}
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
                  bgcolor: "#D32F2F",
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
              label="Nombre de la propiedad"
              type="text"
              id={"PropertieName"}
              show={true}
              onChange={(value) => setPropertieName(value as string || "")}
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
                  bgcolor: "#D32F2F",
                  "&:hover": { bgcolor: "#C62828" },
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