import { Box, Button } from "@mui/material";
import { RegisterRow } from "../inputs/register-row.component";
import { getDepartmentsData } from "../../api/departments/departments.api";
import { useEffect, useState } from "react";
import { DataDepartment, DepartmentsInterface } from "../../interfaces/departments/departments.interface";
import { FormModalProps } from "../modals/form-modal.component";
import { ButtonComponent } from "../buttons/buttons.component";
import { enqueueSnackbar } from "notistack";
import { InputValidators } from "../../functions/input-validators.functions";
import { patchSupervisor, postSupervisor } from "../../api/supervisors/supervisors.api";
import { deleteUser, patchUser, postUser } from "../../api/users/users.api";
import { set } from "date-fns";

export const AdminsFormModal: React.FC<FormModalProps> = ({
  type,
  data,
  onSuccess,
  onCancel,
}) => {
  let UserId = data?.id;
  const AdminId = data?.id;
  const [SupervisorFirstName, setSupervisorFirstName] = useState<string>(
    data?.firstName || ""
  );
  const [SupervisorLastName, setSupervisorLastName] = useState<string>(
    data?.lastName || ""
  )
  const [SupervisorEmail, setSupervisorEmail] = useState<string>(
    data?.email || ""
  );
  const [SupervisorRol, setSupervisorRol] = useState<string>("ADMINISTRATOR");
  const defaultPassword = import.meta.env.VITE_DEFAULT_PASSWORD || "";
  const [SupervisorPassword, setSupervisorPassword] = useState<string>(defaultPassword);
  const userToken = sessionStorage.getItem("_Token") || "";




  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({
    supervisorFirtsName: undefined,
    supervisorLastName: undefined,
    supervisorEmail: undefined,
    supervisorPassword: undefined,
  });


  const SubmitForm = () => {
    const validators = InputValidators();
    const newErrors: { [key: string]: string | undefined } = {};
    const resultName = validators.string(SupervisorFirstName);
    if (resultName) {
      newErrors.supervisorFirtsName = resultName;
    }
    const resultLastName = validators.string(SupervisorLastName);
    if (resultLastName) {
      newErrors.supervisorLastName = resultLastName;
    }
    const resultEmail = validators.email(SupervisorEmail);
    if (resultEmail) {
      newErrors.supervisorEmail = resultEmail;
    }
    const resultPassword = validators.password(SupervisorPassword);
    if (resultPassword) {
      newErrors.supervisorPassword = resultPassword;
    }


    setErrors(newErrors);
    if (!newErrors.supervisorFirtsName &&
      !newErrors.supervisorLastName &&
      !newErrors.supervisorEmail &&
      !newErrors.supervisorPassword) {
      const userToken = sessionStorage.getItem("_Token") || "";

      if (type === "Edit") {
        patchUser(userToken, UserId, {
            firstName: SupervisorFirstName,
            lastName: SupervisorLastName,
            password: SupervisorEmail,
          }).then((data) => {
              if (data) {
                  enqueueSnackbar("Administrador actualizado correctamente", {
                    variant: "success",
                  });
                  onSuccess();
                  onCancel(); 
              }        
          }).catch((error) => {
            enqueueSnackbar("Algo salio mal: " + error, {
              variant: "error",
            })
          })
       
      } else {
        postUser(userToken, {
          firstName: SupervisorFirstName,
          lastName: SupervisorLastName,
          email: SupervisorEmail,
          userRole: SupervisorRol,
          password: SupervisorEmail,
        }).then((data) => {
            if (data) {
                enqueueSnackbar("Administrador agregado correctamente", {
                  variant: "success",
                });
                onSuccess();
                onCancel(); 
            }        
        }).catch((error) => {
          enqueueSnackbar("Algo salio mal: " + error, {
            variant: "error",
          })
        })
      }
    }
  };

  return (
    <>
      {type === "Edit" ? (
        <div className="form-modal">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "2%",
            gap: "1%",
            alignItems: "flex-end",
          }}
        >
          <RegisterRow
            label="Nombres"
            value={SupervisorFirstName}
            type="text"
            id={"supervisorName"}
            show={true}
            onChange={(value) => setSupervisorFirstName(value || "")}
            style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}
            validate={errors.supervisorFirtsName ? "Error" : "Normal"}
            typeError={errors.supervisorFirtsName}
          />
          <RegisterRow
            label="Apellidos"
            value={SupervisorLastName}
            type="text"
            id={"supervisorName"}
            show={true}
            
            onChange={(value) => setSupervisorLastName(value || "")}
            style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}
            validate={errors.supervisorLastName ? "Error" : "Normal"}
            typeError={errors.supervisorLastName}
          />

        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "2%",
            gap: "1%",
            alignItems: "flex-end",
          }}
        >
          <RegisterRow
            label="Correo"
            value={SupervisorEmail}
            type="text"
            id={"supervisorEmail"}
            show={true}
            editable={false}
            onChange={(value) => setSupervisorEmail(value || "")}
            style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}
            validate={errors.supervisorEmail ? "Error" : "Normal"}
            typeError={errors.supervisorEmail}
          />
          <RegisterRow
            label="Contraseña"
            type="password"
            value={SupervisorPassword}
            id={"supervisorPassword"}
            show={true}
            onChange={(value) => setSupervisorPassword(value || "")}
            style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}
            validate={errors.supervisorPassword ? "Error" : "Normal"}
            typeError={errors.supervisorPassword}
          />


        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ maxWidth: "80%" }}>
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "2%",
            gap: "1%",
            alignItems: "flex-end",
          }}
        >
          <RegisterRow
            label="Nombres"
            value={SupervisorFirstName}
            type="text"
            id={"supervisorName"}
            show={true}
            onChange={(value) => setSupervisorFirstName(value || "")}
            style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}
            validate={errors.supervisorFirtsName ? "Error" : "Normal"}
            typeError={errors.supervisorFirtsName}
          />
          <RegisterRow
            label="Apellidos"
            value={SupervisorLastName}
            type="text"
            id={"supervisorName"}
            show={true}
            onChange={(value) => setSupervisorLastName(value || "")}
            style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}
            validate={errors.supervisorLastName ? "Error" : "Normal"}
            typeError={errors.supervisorLastName}
          />

        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "2%",
            gap: "1%",
            alignItems: "flex-end",
          }}
        >
          <RegisterRow
            label="Correo"
            value={SupervisorEmail}
            type="text"
            id={"supervisorEmail"}
            show={true}
            onChange={(value) => setSupervisorEmail(value || "")}
            style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}
            validate={errors.supervisorEmail ? "Error" : "Normal"}
            typeError={errors.supervisorEmail}
          />
          <RegisterRow
            label="Contraseña"
            type="password"
            value={SupervisorPassword}
            id={"supervisorPassword"}
            show={true}
            onChange={(value) => setSupervisorPassword(value || "")}
            style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}
            validate={errors.supervisorPassword ? "Error" : "Normal"}
            typeError={errors.supervisorPassword}
          />


        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ maxWidth: "80%" }}>
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
