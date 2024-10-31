import { IconButton, Pagination } from "@mui/material";
import { ConfirmationModal } from "../modals/confirmation-modal.component";
import { FormModal } from "../modals/form-modal.component";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { TableProps } from "../audits/audits-table.component";
import { LightstringToColor } from "../../functions/utils.functions";
import { SetStateAction, useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { deleteProperty } from "../../api/properties/propertie.api";

export const PropertiesTable: React.FC<TableProps> = ({onUpdate,  data = [] }) => {
    const userToken = sessionStorage.getItem("_Token") || "";
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(6); 
    const [open, setOpen] = useState(false);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);

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
    
    
      const displayedProperty = data.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      );


      const EditClick = (property: SetStateAction<null>) => {
        setSelectedProperty(property);
        setOpen(true);
      };
    
      const DeleteClick = (property: SetStateAction<null>) => {
        setSelectedProperty(property);
        ConfirmationModalOpen();
      };
    
      const ModalClose = () => {
        setOpen(false);
        setSelectedProperty(null);
      };
    
      const ConfirmationModalState = () => {
        setConfirmationOpen(!confirmationOpen);
      };
    
      const ConfirmationModalOpen = () => setConfirmationOpen(true);
      const ConfirmationModalClose = () => setConfirmationOpen(false);
    
      const DeletePropertie = () => {
        if (!selectedProperty) return;
        deleteProperty(userToken, selectedProperty)
          .then((data) => {
            if (data) {
              enqueueSnackbar("Propiedad eliminada correctamente", {
                variant: "success",
              });
              ConfirmationModalClose();
              onUpdate();
            }
          })
          .catch((error) => {
            enqueueSnackbar("Error al eliminar esta propiedad", { variant: "error" });
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
                {displayedProperty.map((property, index) => {
                  const backgroundColor = LightstringToColor(property.name, 0.2);
    
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
                          {property.name}
                        </span>
                      </td>
                      <td className="table-actions">
                        <IconButton
                          aria-label="edit"
                          onClick={() => EditClick(property)}
                        >
                          <EditOutlinedIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => {
                            DeleteClick(property.id);
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
          {selectedProperty && (
            <FormModal
              open={open}
              onConfirm={onUpdate}
              type="Edit"
              onCancel={ModalClose}
              data={selectedProperty}
              title="Editar propiedad"
              entity={"properties"}
            />
            
          )}
            <ConfirmationModal
            open={confirmationOpen}
            onConfirm={DeletePropertie}
            onCancel={ConfirmationModalClose}
            title="Eliminar propiedad"
            message="¿Estas seguro de eliminar esta propiedad?"
          />
        
        </div>
      );
    }