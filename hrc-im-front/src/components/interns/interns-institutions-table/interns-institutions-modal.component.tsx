import { Box, Button } from "@mui/material";
import { RegisterRow } from "../../inputs/register-row.component";
import { ButtonComponent } from "../../buttons/buttons.component";
import { enqueueSnackbar } from "notistack";
import { patchInstitution, postInstitution } from "../../../api/interns/institutions/institutions.api";
import { InputValidators } from "../../../functions/input-validators.functions";
import React, { useState } from "react";
import { FormModalProps } from "../../modals/form-modal.component";

export const InstitutionFormModal: React.FC<FormModalProps> = ({
    type,
    data,
    onSuccess,
    onCancel,
  }) => {
    const InstitutionId = data?.id;
    const [InstitutionName, setInstitutionName] = React.useState<string>(
      data?.name || ""
    );
    const [InstitutionPhone, setInstitutionPhone] = React.useState<string>(
      data?.phone || ""
    );
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
              value={InstitutionPhone}
              type="phone"
              id={"institutionEmail"}
              show={true}
              onChange={(value) => setInstitutionPhone(value || "")}
              validate={errors.institutionPhone ? "Error" : "Normal"}
              typeError={errors.institutionPhone}
              maxLength={10}
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
              type="phone"
              value={InstitutionPhone}
              id={""}
              show={true}
              onChange={(value) => setInstitutionPhone(value || "")}
              validate={errors.institutionPhone ? "Error" : "Normal"}
              typeError={errors.institutionPhone}
              maxLength={10}
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