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

export const SupervisorFormModal: React.FC<FormModalProps> = ({
  type,
  data,
  onSuccess,
  onCancel,
}) => {
  let UserId = data?.user.id;
  const SupervisorId = data?.id;
  const [SupervisorFirstName, setSupervisorFirstName] = useState<string>(
    data?.user.firstName || ""
  );
  const [SupervisorLastName, setSupervisorLastName] = useState<string>(
    data?.user.lastName || ""
  )
  const [SupervisorEmail, setSupervisorEmail] = useState<string>(
    data?.user.email || ""
  );
  const [SupervisorPhone, setSupervisorPhone] = useState<string>(
    data?.phone || ""
  );
  const [SupervisorRol, setSupervisorRol] = useState<string>(
    data?.rol || "SUPERVISOR"
  );
  const [SupervisorDepartment, setSupervisorDepartment] = useState<string>(
    data?.department?.id || ""
  );
  const defaultPassword = import.meta.env.VITE_DEFAULT_PASSWORD || "";
  const [SupervisorPassword, setSupervisorPassword] = useState<string>(defaultPassword);
  const [Departments, setDepartments] = useState<DataDepartment[]>([]);
  const userToken = sessionStorage.getItem("_Token") || "";


  const fetchDepartments = async () => {
    try {
      const fetchedData: DepartmentsInterface | null =
        await getDepartmentsData(userToken);
      if (fetchedData) {
        setDepartments(fetchedData.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, [userToken]);



  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({
    supervisorFirtsName: undefined,
    supervisorLastName: undefined,
    supervisorPhone: undefined,
    supervisorDepartment: undefined,
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
    const resultPhone = validators.phone(SupervisorPhone);
    if (resultPhone) {
      newErrors.supervisorPhone = resultPhone;
    }
    const resultRol = validators.string(SupervisorRol);
    if (resultRol) {
      newErrors.supervisorRol = resultRol;
    }
    const resultDepartment = validators.string(SupervisorDepartment);
    if (resultDepartment) {
      newErrors.supervisorDepartment = resultDepartment;
    }
    const resultPassword = validators.password(SupervisorPassword);
    if (resultPassword) {
      newErrors.supervisorPassword = resultPassword;
    }


    setErrors(newErrors);
    if (!newErrors.supervisorFirtsName &&
      !newErrors.supervisorLastName &&
      !newErrors.supervisorEmail &&
      !newErrors.supervisorPhone &&
      !newErrors.supervisorRol &&
      !newErrors.supervisorDepartment &&
      !newErrors.supervisorPassword) {
      const userToken = sessionStorage.getItem("_Token") || "";

      if (type === "Edit") {


        patchUser(userToken, UserId, {
          firstName: SupervisorFirstName,
          lastName: SupervisorLastName,
          email: SupervisorEmail,
          userRole: SupervisorRol,
          password: SupervisorEmail,
        }).then((data) => {
          patchSupervisor(userToken, SupervisorId, {
            phone: SupervisorPhone,
            departmentId: SupervisorDepartment,
            userId: UserId,
          })
            .then((data) => {
              if (data) {
                enqueueSnackbar("supervisor actualizado correctamente", {
                  variant: "success",
                });
                onSuccess();
                onCancel();
              }
            })
            .catch((error) => {
              enqueueSnackbar(
                "Error al actualizar la información del supervisor: " + error,
                { variant: "error" }
               
              );
            });
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
          UserId = data.data.id;
          postSupervisor(userToken, {
            phone: SupervisorPhone,
            departmentId: SupervisorDepartment,
            userId: UserId,
          }
        )
            .then((data) => {
              if (data) {
                enqueueSnackbar("supervisor agregado correctamente", {
                  variant: "success",
                });
                onSuccess();
                onCancel();
              }
            })
            .catch((error) => {
              enqueueSnackbar("Error al agregar el supervisor: " + error, {
                variant: "error",
              });
              deleteUser(userToken, UserId);
            });
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
            onChange={(value) => setSupervisorEmail(value || "")}
            style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}
            validate={errors.supervisorEmail ? "Error" : "Normal"}
            typeError={errors.supervisorEmail}
          />
          <RegisterRow
            label="Departamento"
            value={SupervisorDepartment}
            options={[
              { id: "", name: "Seleccione un departamento" }, // Opción por defecto
              ...Departments.map((department) => ({ id: department.id, name: department.name }))
            ].map((department) => department.name)}
            type="select"
            id={"supervisorDepartment"}
            show={true}
            onChange={(value) => {
              const selectedDepartment = Departments.find(
                (department) => department.name === value
              );
              setSupervisorDepartment(
                selectedDepartment
                  ? selectedDepartment.id.toString()
                  : ""
              );
            }}
            style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}
            validate={errors.supervisorDepartment ? "Error" : "Normal"}
            typeError={errors.supervisorDepartment}
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
            label="Teléfono"
            value={SupervisorPhone}
            type="phone"
            id={"supervisorPhone"}
            maxLength={10}
            show={true}
            onChange={(value) => setSupervisorPhone(value || "")}
            style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}
            validate={errors.supervisorPhone ? "Error" : "Normal"}
            typeError={errors.supervisorPhone}
          />
          <RegisterRow
            label="Privilegios"
            options={["SUPERVISOR", "SUPERVISOR_RH"]}
            type="select"
            value={SupervisorRol}
            id={"supervisorRol"}
            show={true}
            onChange={(value) => setSupervisorRol(value || "")}
            style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}
            validate={errors.supervisorRol ? "Error" : "Normal"}
            typeError={errors.supervisorRol}
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
              label="Departamento"
              value={SupervisorDepartment}
              options={[
                { id: "", name: "Seleccione un departamento" },
                ...Departments.map((department) => ({ id: department.id, name: department.name }))
              ].map((department) => department.name)}
              type="select"
              id={"supervisorDepartment"}
              show={true}
              onChange={(value) => {
                const selectedDepartment = Departments.find(
                  (department) => department.name === value
                );
                setSupervisorDepartment(
                  selectedDepartment
                    ? selectedDepartment.id.toString()
                    : ""
                );
              }}
              style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}
              validate={errors.supervisorDepartment ? "Error" : "Normal"}
              typeError={errors.supervisorDepartment}
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
              label="Teléfono"
              value={SupervisorPhone}
              type="phone"
              id={"supervisorPhone"}
              maxLength={10}
              show={true}
              onChange={(value) => setSupervisorPhone(value || "")}
              style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}
              validate={errors.supervisorPhone ? "Error" : "Normal"}
              typeError={errors.supervisorPhone}
            />
            <RegisterRow
              label="Privilegios"
              options={["SUPERVISOR", "SUPERVISOR_RH"]}
              type="select"
              value={SupervisorRol}
              id={"supervisorRol"}
              show={true}
              onChange={(value) => setSupervisorRol(value || "")}
              style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}
              validate={errors.supervisorRol ? "Error" : "Normal"}
              typeError={errors.supervisorRol}
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
