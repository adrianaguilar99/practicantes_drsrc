import { IconButton, Pagination } from '@mui/material';
import '../../components.css';
import { SetStateAction, useEffect, useState } from 'react';
import { TableProps } from '../../audits/audits-table.component';
import { on } from 'events';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { LightstringToColor } from '../../../functions/utils.functions';
import { FormModal } from '../../modals/form-modal.component';
import { deleteCareer } from '../../../api/interns/careers/careers.api';
import { enqueueSnackbar } from 'notistack';
import { ConfirmationModal } from '../../modals/confirmation-modal.component';

export const CareersTable : React.FC<TableProps> = ({ onUpdate, data = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7); 
  const userToken = sessionStorage.getItem("_Token") || "";
  const [open, setOpen] = useState(false); 
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState(null); 

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


  const displayedCareers = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const EditClick = (career: SetStateAction<null>) => {
    setSelectedCareer(career); 
    setOpen(true); 
  };

  const DeleteClick = (career: SetStateAction<null>) => {
    setSelectedCareer(career); 
    ConfirmationModalOpen();
  };

  const ModalClose = () => {
    setOpen(false);
    setSelectedCareer(null); 
  };

  const ConfirmationModalState = () => {
    setConfirmationOpen(!confirmationOpen);
  };

  const ConfirmationModalOpen = () => setConfirmationOpen(true);
  const ConfirmationModalClose = () => setConfirmationOpen(false);

  const DeleteCareer = () => {
    if (!selectedCareer) return;
    deleteCareer(userToken, selectedCareer)
      .then((data) => {
        if (data) {
          enqueueSnackbar('Carrera eliminada correctamente', { variant: 'success' });
          ConfirmationModalClose();
          onUpdate();
        }
      })
      .catch((error) => {
        enqueueSnackbar('Error al eliminar la carrera', { variant: 'error' });
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
          {displayedCareers.map((career, index) => {
            const backgroundColor = LightstringToColor(career.name, 0.2);

            return (
              <tr key={index} className="generic-table-row">
                 <td style={{ minWidth: '200px' }}>
                    <span
                      className="tag"
                      style={{
                        backgroundColor: backgroundColor,
                        padding: '10px 10px',
                        borderRadius: '20px',
                        fontWeight: 'bold',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        margin: '1.2%'
                      }}>
                      {career.name}
                    </span>
                  </td>
                <td className="table-actions">
                  <IconButton aria-label="edit" onClick={() => EditClick(career)}>
                    <EditOutlinedIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => {DeleteClick(career.id)}}>
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
    {selectedCareer && (
      <FormModal
        open={open}
        onConfirm={onUpdate}
        type="Edit"
        onCancel={ModalClose}
        data={selectedCareer}
        title="Editar carrera" entity={"interns-careers"}/>
    )}
     <ConfirmationModal open={confirmationOpen} onConfirm={DeleteCareer} onCancel={ConfirmationModalClose} title="Eliminar carrera" message="¿Estas seguro de eliminar esta carrera?" />
  </div>
  );
};
