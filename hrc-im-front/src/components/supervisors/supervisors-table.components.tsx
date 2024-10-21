import { SetStateAction, useEffect, useState } from "react";
import { Pagination, Avatar, IconButton } from "@mui/material";
import PhoneEnabledOutlinedIcon from '@mui/icons-material/PhoneEnabledOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { LightstringToColor, stringAvatar } from '../../functions/utils.functions';
import { TableProps } from "../audits/audits-table.component";
import { FormModal } from "../modals/form-modal.component";

export const SupervisorsTable: React.FC<TableProps> = ({ data = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [open, setOpen] = useState(false); // Estado para abrir/cerrar modal
  const [selectedSupervisor, setSelectedSupervisor] = useState(null); // Estado para guardar supervisor seleccionado

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

  // Función para abrir el modal y pasar los datos del supervisor
  const handleEditClick = (supervisor: SetStateAction<null>) => {
    setSelectedSupervisor(supervisor); // Guardar supervisor seleccionado
    setOpen(true); // Abrir modal
  };

  // Función para cerrar el modal
  const handleModalClose = () => {
    setOpen(false); // Cerrar modal
    setSelectedSupervisor(null); // Limpiar datos del supervisor seleccionado
  };

  const displayedSupervisors = data.slice(
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
              <th>Permisos</th>
              <th>Departamento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {displayedSupervisors.map((supervisor, index) => {
              const backgroundColor = LightstringToColor(supervisor.department, 0.2);

              return (
                <tr key={index} className="generic-table-row">
                  <td className="table-avatar">
                    <div className="supervisor-info">
                      <Avatar {...stringAvatar(supervisor.name)} />
                      <p>{supervisor.name}</p>
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
                      {supervisor.rol}
                    </span>
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
                      {supervisor.department}
                    </span>
                  </td>

                  <td className="table-actions">
                    <IconButton aria-label="phone">
                      <PhoneEnabledOutlinedIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={() => handleEditClick(supervisor)}>
                      <EditOutlinedIcon />
                    </IconButton>
                    <IconButton aria-label="delete">
                      <DeleteOutlineOutlinedIcon />
                    </IconButton>
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

      {/* Modal para editar supervisor */}
      {selectedSupervisor && (
        <FormModal
          open={open}
          onConfirm={handleModalClose}
          type="Edit"
          onCancel={handleModalClose}
          data={selectedSupervisor}
          title="Editar Supervisor" entity={"supervisors"}/>
      )}
    </div>
  );
};
