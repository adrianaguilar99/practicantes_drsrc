import { SetStateAction, useEffect, useState } from "react";
import { Pagination, Avatar, IconButton } from "@mui/material";
import PhoneEnabledOutlinedIcon from '@mui/icons-material/PhoneEnabledOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { formatPhoneNumber, LightstringToColor, stringAvatar } from '../../functions/utils.functions';
import { TableProps } from "../audits/audits-table.component";
import { FormModal } from "../modals/form-modal.component";
import { DataUser } from "../../interfaces/users.interface";

export const AdminsTable: React.FC<TableProps> = ({onUpdate,  data = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [open, setOpen] = useState(false);
  const [selectedAdministrator, setSelectedAdministrator] = useState<DataUser | null>(null); 
  const userFullName = sessionStorage.getItem('_ProfileName');

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
                    <div className="supervisor-info">
                      <Avatar {...stringAvatar(fullName)} />
                      <p>{fullName}</p>
                    </div>
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
                    <IconButton aria-label="delete">
                      <DeleteOutlineOutlinedIcon />
                    </IconButton>
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
          onConfirm={ModalClose}
          type="Edit"
          onCancel={ModalClose}
          data={selectedAdministrator}
          title="Editar Supervisor"
          entity={"administrators"}
        />
      )}
    </div>
  );
};
