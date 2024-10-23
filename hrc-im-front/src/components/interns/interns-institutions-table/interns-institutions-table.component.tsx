import { SetStateAction, useEffect, useState } from "react";
import { IconButton, Pagination } from "@mui/material";
import { TableProps } from "../../audits/audits-table.component";
import { deleteInstitution } from "../../../api/interns/institutions/institutions.api";
import { enqueueSnackbar } from "notistack";
import { FormModal } from "../../modals/form-modal.component";
import { ConfirmationModal } from "../../modals/confirmation-modal.component";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { formatPhoneNumber, LightstringToColor } from "../../../functions/utils.functions";

export const InstitutionsTable: React.FC<TableProps> = ({
  onUpdate,
  data = [],
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const userToken = sessionStorage.getItem("_Token") || "";
  const [open, setOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState(null);

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
    window.addEventListener("resize", ResizePage);
    return () => window.removeEventListener("resize", ResizePage);
  }, []);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const PageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const displayedUniversities = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const EditClick = (career: SetStateAction<null>) => {
    setSelectedInstitution(career);
    setOpen(true);
  };

  const DeleteClick = (institution: SetStateAction<null>) => {
    setSelectedInstitution(institution);
    ConfirmationModalOpen();
  };

  const ModalClose = () => {
    setOpen(false);
    setSelectedInstitution(null);
  };

  const ConfirmationModalState = () => {
    setConfirmationOpen(!confirmationOpen);
  };

  const ConfirmationModalOpen = () => setConfirmationOpen(true);
  const ConfirmationModalClose = () => setConfirmationOpen(false);

  const DeleteInstitution = () => {
    if (!selectedInstitution) return;
    deleteInstitution(userToken, selectedInstitution)
      .then((data) => {
        if (data) {
          enqueueSnackbar("Institución eliminada correctamente", {
            variant: "success",
          });
          ConfirmationModalClose();
          onUpdate();
        }
      })
      .catch((error) => {
        enqueueSnackbar("Error al eliminar la institución", { variant: "error" });
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
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {displayedUniversities.map((instition, index) => {
              const backgroundColor = LightstringToColor(instition.name, 0.2);

              return (
                <tr key={index} className="generic-table-row">
                  <td style={{ minWidth: "50px" }}>
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
                      {instition.name}
                    </span>
                  </td>
                  <td>
                    <span>
                        {formatPhoneNumber(instition.phone)}
                    </span>
                  </td>
                  <td className="table-actions">
                    <IconButton
                      aria-label="edit"
                      onClick={() => EditClick(instition)}
                    >
                      <EditOutlinedIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        DeleteClick(instition.id);
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
      {selectedInstitution && (
        <FormModal
          open={open}
          onConfirm={onUpdate}
          type="Edit"
          onCancel={ModalClose}
          data={selectedInstitution}
          title="Editar institución"
          entity={"interns-institutions"}
        />
      )}
      <ConfirmationModal
        open={confirmationOpen}
        onConfirm={DeleteInstitution}
        onCancel={ConfirmationModalClose}
        title="Eliminar institución"
        message="¿Estas seguro de eliminar esta institución?"
      />
    </div>
  );
};
