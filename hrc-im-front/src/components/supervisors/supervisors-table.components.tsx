import { SetStateAction, useEffect, useState } from "react";
import { Pagination, Avatar, IconButton } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import { formatPhoneNumber, LightstringToColor, stringAvatar } from '../../functions/utils.functions';
import { TableProps } from "../audits/audits-table.component";
import { FormModal } from "../modals/form-modal.component";
import { DataSupervisor } from '../../interfaces/supervisors/supervisor.interface';  
import { deleteSupervisor} from "../../api/supervisors/supervisors.api";
import { enqueueSnackbar } from "notistack";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { ConfirmationModal } from "../modals/confirmation-modal.component";
import { decryptData } from "../../functions/encrypt-data.function";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { patchUser } from "../../api/users/users.api";

export const SupervisorsTable: React.FC<TableProps> = ({onUpdate,  data = [] }) => {
  const userToken = sessionStorage.getItem("_Token") || "";
  const userRol = useSelector((state: RootState) => decryptData(state.auth.rol || "") || "");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [open, setOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [selectedSupervisor, setSelectedSupervisor] = useState<DataSupervisor | null>(null); 
  const userFullName = sessionStorage.getItem('_ProfileName');
  const [typeAction, setTypeAction] = useState('');

  useEffect(() => {
    const ResizePage = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 1375) {
        setRowsPerPage(5);
      } else if (screenWidth < 1024) {
        setRowsPerPage(4);
      } else {
        setRowsPerPage(7);
      }
    };

    ResizePage();
    window.addEventListener('resize', ResizePage);
    return () => window.removeEventListener('resize', ResizePage);
  }, []);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const PageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };
  const EditClick = (supervisor: DataSupervisor) => {
    setSelectedSupervisor(supervisor); 
    setOpen(true); 
  };

  const ModalClose = () => {
    setOpen(false); 
    setSelectedSupervisor(null); 
  };

  const displayedSupervisors = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const DeleteClick = (supervisor: DataSupervisor | null) => {
    setSelectedSupervisor(supervisor);
    ConfirmationModalOpen();
};

  const ConfirmationModalState = () => {
    setConfirmationOpen(!confirmationOpen);
  };

  const ConfirmationModalOpen = () => setConfirmationOpen(true);
  const ConfirmationModalClose = () => setConfirmationOpen(false);

  const DeleteSupervisor = () => {
    if (!selectedSupervisor) return;
    deleteSupervisor(userToken, selectedSupervisor.id)
      .then((data) => {
        if (data) {
          enqueueSnackbar("supervisor desactivado correctamente", {
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
    if (!selectedSupervisor) return;
    patchUser(userToken, selectedSupervisor.id,{
      isActive: true,
    })
      .then((data) => {
        if (data) {
          enqueueSnackbar("supervisor activado correctamente", {
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
    <div className="generic-table-container">
      <div className="generic-table-container-body">
        <table className="generic-table">
          <thead className="generic-table-headers">
            <tr>
              <th>Nombre</th>
              <th>Telefono</th>
              <th>Permisos</th>
              <th>Departamento</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {displayedSupervisors.map((supervisor, index) => {
              const backgroundColor = LightstringToColor(supervisor.user?.userRole || '', 0.2);
              const backgroundColor2 = LightstringToColor(supervisor.department?.name || '', 0.2);
              const fullName = `${supervisor.user.firstName} ${supervisor.user?.lastName}`;

              return (
                <tr key={index} className={`generic-table-row  ${supervisor.user.isActive ? '' : 'inactive'}`} >
                  <td className="table-avatar">
                    <div className="supervisor-info">
                      <Avatar {...stringAvatar(fullName)} />
                      <p>{fullName}</p>
                    </div>
                  </td>
                  <td>{formatPhoneNumber(supervisor.phone)}</td>
                  <td>
                    <span
                      className="tag"
                      style={{
                        backgroundColor: backgroundColor,
                        padding: '5px 10px',
                        borderRadius: '20px',
                        fontWeight: 'bold',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                      }}>
                      {supervisor.user.userRole}
                    </span>
                  </td>
                  <td>
                    <span
                      className="tag"
                      style={{
                        backgroundColor: backgroundColor2,
                        padding: '5px 10px',
                        borderRadius: '20px',
                        fontWeight: 'bold',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                      }}>
                      {supervisor.department?.name}
                    </span>
                  </td>
                  <td className={`table-status  ${supervisor.user.isActive ? 'active' : 'inactive'}`}>{supervisor.user.isActive ? "Activo" : "Inactivo"}</td>

                  <td className="table-actions" >
                  {fullName != userFullName ? (
                    <div style={{display: 'flex'}}>
  <IconButton aria-label="edit" onClick={() => EditClick(supervisor)}>
                      <EditOutlinedIcon />
                    </IconButton>
                    {userRol === "ADMINISTRATOR" ?(
                      <div style={{display: 'flex'}}>
                         {supervisor.user.isActive  ? (
                      <IconButton aria-label="delete" onClick={() => {DeleteClick(supervisor.user);setTypeAction("delete")}}>
                      <PersonOffOutlinedIcon />
                    </IconButton>
                    ) : <IconButton aria-label="delete">
                      <IconButton aria-label="active" onClick={() => {DeleteClick(supervisor.user);setTypeAction("active")}}>
                    <CheckRoundedIcon />
                    </IconButton>
                  </IconButton>}
                      </div>
                    ) : null}
                   
                  </div>
                  ) : (
                       null
                  )}
                  
                    
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="table-pagination">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={PageChange}
          variant="outlined"
          shape="rounded"
          size="small"
        />
      </div>

      {selectedSupervisor && (
        <FormModal
          open={open}
          onConfirm={onUpdate}
          type="Edit"
          onCancel={ModalClose}
          data={selectedSupervisor}
          title="Editar Supervisor"
          entity={"supervisors"}
        />
      )}
       <ConfirmationModal
        open={confirmationOpen}
        onConfirm={typeAction == "active" ? ActiveSupervisor : DeleteSupervisor}
        onCancel={ConfirmationModalClose}
        title="Desactivar Supervisor"
        message={typeAction == "active" ? "¿Estas seguro de activar la cuenta de este supervisor?" : "¿Estas seguro que quieres desactivar la cuenta de este supervisor?"}
      />
    </div>
  );
};
