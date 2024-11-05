import { SetStateAction, useEffect, useState } from "react";
import { Pagination, Avatar, IconButton, Tooltip } from "@mui/material";
import PhoneEnabledOutlinedIcon from '@mui/icons-material/PhoneEnabledOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { formatPhoneNumber, LightstringToColor, stringAvatar } from '../../functions/utils.functions';
import { TableProps } from "../audits/audits-table.component";
import { FormModal } from "../modals/form-modal.component";
import { DataUser } from "../../interfaces/users.interface";
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { enqueueSnackbar } from "notistack";
import { activateUser, deleteUser, patchUser } from "../../api/users/users.api";
import { ConfirmationModal } from "../modals/confirmation-modal.component";
export const AdminsTable: React.FC<TableProps> = ({onUpdate,  data = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [open, setOpen] = useState(false);
  const userToken = sessionStorage.getItem("_Token") || "";
  const [selectedAdministrator, setSelectedAdministrator] = useState<DataUser | null>(null); 
  const userFullName = sessionStorage.getItem('_ProfileName');
  const [typeAction, setTypeAction] = useState('');
  const [confirmationOpen, setConfirmationOpen] = useState(false);

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

  const EditClick = (administrator: DataUser) => {
    setSelectedAdministrator(administrator); 
    setOpen(true); 
  };

  const ModalClose = () => {
    setOpen(false); 
    setSelectedAdministrator(null);
  };

  const displayedAdministrators = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const DeleteClick = (administrator: DataUser | null) => {
    setSelectedAdministrator(administrator);
    ConfirmationModalOpen();
};

const ConfirmationModalState = () => {
  setConfirmationOpen(!confirmationOpen);
};

const ConfirmationModalOpen = () => setConfirmationOpen(true);
const ConfirmationModalClose = () => setConfirmationOpen(false);

const DeleteAdministrator = () => {
  if (!selectedAdministrator) return;
  deleteUser(userToken, selectedAdministrator.id)
    .then((data) => {
      if (data) {
        enqueueSnackbar("Administrador desactivado correctamente", {
          variant: "success",
        });
        ConfirmationModalClose();
        onUpdate();
      }
    })
    .catch((error) => {
      enqueueSnackbar("Error al desactivar el administrador", { variant: "error" });
      ConfirmationModalClose();
    });
};

const ActiveAdministrator = () => {
  if (!selectedAdministrator) return;
  activateUser(userToken, selectedAdministrator.id)
    .then((data) => {
      if (data) {
        enqueueSnackbar("Administrador activado correctamente", {
          variant: "success",
        });
        ConfirmationModalClose();
        onUpdate();
      }
    })
    .catch((error) => {
      enqueueSnackbar("Error al activar el administrador", { variant: "error" });
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
              <th>Privilegios</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {displayedAdministrators.map((administrator, index) => {
              const backgroundColor = LightstringToColor(administrator.userRole || '', 0.2);
              const fullName = `${administrator.firstName} ${administrator.lastName}`;

              return (
                <tr key={index} className={`generic-table-row  ${administrator.isActive ? '' : 'inactive'}`}>
                  <td className="table-avatar">
                  <Tooltip title={administrator.email} placement="right"> 
                    <div className="supervisor-info">
                      <Avatar {...stringAvatar(fullName)} />
                      <p>{fullName}</p>
                    </div>
                    </Tooltip>
                  </td>
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
                      {administrator.userRole}
                    </span>
                  </td>
                  <td className={`table-status  ${administrator.isActive ? 'active' : 'inactive'}`}>{administrator.isActive ? "Activo" : "Inactivo"}</td>
                  {fullName != userFullName ? (
                    <td className="table-actions">
                    <IconButton aria-label="edit" onClick={() => EditClick(administrator)}>
                      <EditOutlinedIcon />
                    </IconButton>
                    {administrator.isActive  ? (
                    <IconButton aria-label="delete" onClick={() => {DeleteClick(administrator);setTypeAction("delete")}}>
                      <DeleteOutlineOutlinedIcon />
                      </IconButton>
                    ):(
                      <IconButton aria-label="active" onClick={() => {DeleteClick(administrator);setTypeAction("active")}}>
                       <CheckBoxOutlinedIcon/>
                      </IconButton>
                    )
                     }
                  </td>
                  ): (
                    <td className="table-actions">
                    </td>
                  )}
                  
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

      {selectedAdministrator && (
        <FormModal
          open={open}
          onConfirm={onUpdate}
          type="Edit"
          onCancel={ModalClose}
          data={selectedAdministrator}
          title="Editar Supervisor"
          entity={"administrators"}
        />
      )}
         <ConfirmationModal
        open={confirmationOpen}
        onConfirm={typeAction == "active" ? ActiveAdministrator : DeleteAdministrator}
        onCancel={ConfirmationModalClose}
        title="Desactivar Supervisor"
        message={typeAction == "active" ? "¿Estas seguro de activar la cuenta de este administrador?" : "¿Estas seguro que quieres desactivar la cuenta de este administrador?"}
      />
    </div>
  );
};
