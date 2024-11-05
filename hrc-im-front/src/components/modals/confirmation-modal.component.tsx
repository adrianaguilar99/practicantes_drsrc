import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
interface ConfirmationModalProps {
  open: boolean;
  onConfirm: () => void;  
  onCancel: () => void;   
  title: string;       
  informationModal?: boolean; 
  message: string;     
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ open, onConfirm, onCancel, informationModal, title, message }) => {

  const Close = (event: {}, reason: "backdropClick" | "escapeKeyDown") => {
    if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
      onCancel();  
    }
  };

  return (
    <Modal
      open={open}
      onClose={Close}
      disableEscapeKeyDown 
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: '5px',
          boxShadow: 24,
          p: 0,
        }}
      >
        <Box
          sx={{
            bgcolor: '#EDEDED',
            color: '#2E3B4E',
            padding: '10px 16px',
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
            {title}
          </Typography>
        </Box>

        <Box sx={{ p: 3,bgcolor: '#EDEDED' }}>
          <Typography variant="body1" mb={2}>
            {message}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: informationModal ? 'center' : 'space-between' }}>
            {!informationModal && (
                        <Button
                        variant="contained"
                        color="primary"
                        sx={{ bgcolor: '#007BFF', '&:hover': { bgcolor: '#0056b3' } }}
                        onClick={onConfirm}
                      >
                        Confirmar
                      </Button>
            )}
  

            <Button
              variant="contained"
              color="secondary"
              sx={informationModal ? { bgcolor: '#007BFF', '&:hover': { bgcolor: '#0056b3' } } : { bgcolor: '#D32F2F', '&:hover': { bgcolor: '#8b4513' } } }
              onClick={onCancel}
            >
             {informationModal ? "Aceptar" : "Cancelar"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};









export const DeleteAllRecordsConfirmationModal: React.FC<ConfirmationModalProps> = ({ open, onConfirm, onCancel, title, message }) => {

  const Close = (event: {}, reason: "backdropClick" | "escapeKeyDown") => {
    if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
      onCancel();  
    }
  };

  return (
    <Modal
      open={open}
      onClose={Close}
      disableEscapeKeyDown 
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          borderRadius: '8px',
          boxShadow: 24,
          p: 0,
        }}
      >
        <Box
          sx={{
            bgcolor: '#2C3E50',
            color: '#fff',
            padding: '10px 16px',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
            {title}
          </Typography>
        </Box>

        <Box sx={{ p: 3 }}>
          <Typography variant="body1" mb={2}>
            {message}
          </Typography>
          <p style={{ color: 'red', margin: 0 ,textAlign: 'center'}}>Esta operación no se puede deshacer.</p>

<div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
<WarningAmberOutlinedIcon sx={{ color: 'orange', fontSize: '6rem' }} />
</div>
         


          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ bgcolor: '#007BFF', '&:hover': { bgcolor: '#0056b3' } }}
              onClick={onConfirm}
            >
              Confirmar
            </Button>

            <Button
              variant="contained"
              color="secondary"
              sx={{ bgcolor: '#A0522D', '&:hover': { bgcolor: '#8b4513' } }}
              onClick={onCancel}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

