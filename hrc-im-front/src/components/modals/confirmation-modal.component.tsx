import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

interface ConfirmationModalProps {
  open: boolean;
  onConfirm: () => void;  
  onCancel: () => void;   
  title: string;        
  message: string;       
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ open, onConfirm, onCancel, title, message }) => {
  return (
    <Modal open={open} onClose={onCancel}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
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
          <Typography variant="h6" component="h3">
            {title}
          </Typography>
        </Box>


        <Box
          sx={{
            p: 3,
          }}
        >
          <Typography variant="body1" mb={2}>
            {message}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                bgcolor: '#007BFF',
                '&:hover': { bgcolor: '#0056b3' },
              }}
              onClick={onConfirm}  // Llamada a confirmar
            >
              Confirmar
            </Button>

            <Button
              variant="contained"
              color="secondary"
              sx={{
                bgcolor: '#A0522D',
                '&:hover': { bgcolor: '#8b4513' },
              }}
              onClick={onCancel}  // Llamada a cancelar
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
