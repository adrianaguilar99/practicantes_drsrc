import React, { useState } from "react";
import "../../components.css";
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate } from "react-router-dom";
import { ConfirmationModal } from "../../modals/confirmation-modal.component";
import { DataIntern } from "../../../interfaces/interns/interns.interface";
import { IconButton } from "@mui/material";
import { deleteUser, patchUser } from "../../../api/users/users.api";
import { enqueueSnackbar } from "notistack";
import { DataUser } from "../../../interfaces/users.interface";
import { decryptData } from "../../../functions/encrypt-data.function";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

interface InternCardProps {
  id: string;
  data: DataIntern;
  onClick?: () => void;
  onUpdate: () => void;
}

const InternCardComponent: React.FC<InternCardProps> = ({
  id,
  data,
  onUpdate,
}) => {
  const [selectedIntern, setselectedIntern] = useState<DataIntern | null>(null); 
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const userToken = sessionStorage.getItem("_Token") || "";
  const userRol = useSelector((state: RootState) => decryptData(state.auth.rol || "") || "");
  const [typeAction, setTypeAction] = useState('');
  const navigate = useNavigate();

  const Click = () => {
    navigate(`/interns/intern-information/${id}`);
  };
  const EditClick = () => {
    navigate(`/interns/intern-information/${id}?edit=true`);
  };

  const DeleteClick = (intern : any) => {
    setselectedIntern(intern);
    ConfirmationModalOpen();
};

  const ConfirmationModalState = () => {
    setConfirmationOpen(!confirmationOpen);
  };

  const ConfirmationModalOpen = () => setConfirmationOpen(true);
  const ConfirmationModalClose = () => setConfirmationOpen(false);

  const DeleteSupervisor = () => {
    if (!selectedIntern) return;
    deleteUser(userToken, selectedIntern.id)
      .then((data) => {
        if (data) {
          enqueueSnackbar("Cuenta del practicante desactivada correctamente", {
            variant: "success",
          });
          ConfirmationModalClose();
          onUpdate();
        }
      })
      .catch((error) => {
        enqueueSnackbar("Error al desactivar el supervisor", { variant: "error" });
        ConfirmationModalClose();
      });
  };

  const ActiveSupervisor = () => {
    if (!selectedIntern) return;
    patchUser(userToken, selectedIntern.id,{
      isActive: true,
    })
      .then((data) => {
        if (data) {
          enqueueSnackbar("Cuenta del practicante activado correctamente", {
            variant: "success",
          });
          ConfirmationModalClose();
          onUpdate();
        }
      })
      .catch((error) => {
        enqueueSnackbar("Error al activar el supervisor", { variant: "error" });
        ConfirmationModalClose();
      });
  };

  return (
    <div className={`intern-card  ${data.user.isActive ? '' : 'inactive'}`}>
      <div
        className={`intern-type  ${data.department ? "interno" : "externo"}`}
        onClick={Click}
      >
        <span>{`PRACTICANTE ${data.department ? "INTERNO" : "EXTERNO"}`}</span>
      </div>
      <div className="intern-card-container" onClick={Click}>
        <div className="info-section">
          <h3>{data.user.firstName + " " + data.user.lastName}</h3>
          <p>Departamento: {data.internshipDepartment.name}</p>
        </div>
        <div className="progress-section">
          <span>
            {data.phone.length === 100 ? "¡Completado!" : `${90}%`}
          </span>
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${90}%` }}
            ></div>
          </div>
        </div>
      </div>
      {userRol != "SUPERVISOR" && (
              <div className="actions" >
              <EditOutlinedIcon onClick={EditClick} />
      
              {data.user.isActive ? (
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    DeleteClick(data.user);
                    setTypeAction("delete");
                  }}
                >
                  <PersonOffOutlinedIcon />
                </IconButton>
              ) : (
                <IconButton
                  aria-label="active"
                  onClick={() => {
                    DeleteClick(data.user);
                    setTypeAction("active");
                  }}
                >
                  <CheckBoxOutlinedIcon />
                </IconButton>
              )}
            </div>
      )}

      <ConfirmationModal
        open={confirmationOpen}
        onConfirm={typeAction == "active" ? ActiveSupervisor : DeleteSupervisor}
        onCancel={ConfirmationModalClose}
        title="Desactivar Supervisor"
        message={
          typeAction == "active"
            ? "¿Estas seguro de activar la cuenta de este supervisor?"
            : "¿Estas seguro que quieres desactivar la cuenta de este supervisor?"
        }
      />
    </div>
  );
};

export default InternCardComponent;
