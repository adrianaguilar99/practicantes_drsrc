import { useState, useEffect, SetStateAction } from 'react';
import { IconButton, Pagination } from '@mui/material';
import '../components.css';
import { TableProps } from '../audits/audits-table.component';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { deleteDepartment } from '../../api/departments/departments.api';
import { enqueueSnackbar } from 'notistack';
import { ConfirmationModal } from '../modals/confirmation-modal.component';
import { FormModal } from '../modals/form-modal.component';
import { LightstringToColor } from '../../functions/utils.functions';

export const DepartmentsTable : React.FC<TableProps> = ({onUpdate,  data = [] }) => {

  const userToken = sessionStorage.getItem("_Token") || "";
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6); 
  const [open, setOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    const ResizePage = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 1375) {
        setRowsPerPage(5);
      } else if (screenWidth < 1024) {
        setRowsPerPage(4);
      } else {
        setRowsPerPage(6);
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


  const displayedDepartments = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const EditClick = (department: SetStateAction<null>) => {
    setSelectedDepartment(department);
    setOpen(true);
  };

  const DeleteClick = (department: SetStateAction<null>) => {
    setSelectedDepartment(department);
    ConfirmationModalOpen();
  };

  const ModalClose = () => {
    setOpen(false);
    setSelectedDepartment(null);
  };

  const ConfirmationModalState = () => {
    setConfirmationOpen(!confirmationOpen);
  };

  const ConfirmationModalOpen = () => setConfirmationOpen(true);
  const ConfirmationModalClose = () => setConfirmationOpen(false);

  const DeleteDepartment = () => {
    if (!selectedDepartment) return;
    deleteDepartment(userToken, selectedDepartment)
      .then((data) => {
        if (data) {
          enqueueSnackbar("Departamento eliminado correctamente", {
            variant: "success",
          });
          ConfirmationModalClose();
          onUpdate();
        }
      })
      .catch((error) => {
        enqueueSnackbar("Error al eliminar el departamento", { variant: "error" });
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
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {displayedDepartments.map((department, index) => {
              const backgroundColor = LightstringToColor(department.name, 0.2);

              return (
                <tr key={index} className="generic-table-row">
                  <td style={{ minWidth: "200px" }}>
                    <span
                      className="tag"
                      style={{
                        backgroundColor: backgroundColor,
                        padding: "10px 10px",
                        borderRadius: "20px",
                        fontWeight: "bold",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        margin: "1.2%",
                      }}
                    >
                      {department.name}
                    </span>
                  </td>
                  <td className="table-actions">
                    <IconButton
                      aria-label="edit"
                      onClick={() => EditClick(department)}
                    >
                      <EditOutlinedIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        DeleteClick(department.id);
                      }}
                    >
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
      {selectedDepartment && (
        <FormModal
          open={open}
          onConfirm={onUpdate}
          type="Edit"
          onCancel={ModalClose}
          data={selectedDepartment}
          title="Editar departamento"
          entity={"departments"}
        />
      )}
      <ConfirmationModal
        open={confirmationOpen}
        onConfirm={DeleteDepartment}
        onCancel={ConfirmationModalClose}
        title="Eliminar departamento"
        message="¿Estas seguro de eliminar este departamento?"
      />
    </div>
  );
};
