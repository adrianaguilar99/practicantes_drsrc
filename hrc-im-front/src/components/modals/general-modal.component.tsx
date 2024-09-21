import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';

interface CustomModalProps {
    open: boolean;
    ModalState: () => void;
}
export const CustomModal: React.FC<CustomModalProps> = ({ open, ModalState }) => {


  return (
    <div>
      <Modal open={open} onClose={ModalState}>
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
            p: 0, // Sin padding para ajustar header separado
          }}
        >
          {/* Header del Modal */}
          <Box
            sx={{
              bgcolor: '#2C3E50', // Color de fondo azul oscuro
              color: '#fff',
              padding: '10px 16px',
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h6" component="h2">
              Hacer un comentario del practicante
            </Typography>
          </Box>

          {/* Contenido del Modal */}
          <Box
            sx={{
              p: 3, // Padding interno del contenido
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 2,
              }}
            >
              <Typography variant="body1">Mensaje:</Typography>
              <Typography variant="body1">A: Recursos Humanos</Typography>
            </Box>

            <TextField
              fullWidth
              multiline
              minRows={4}
              variant="outlined"
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px', // Bordes redondeados
                },
              }}
            />

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
                  bgcolor: '#007BFF', // Color azul para el botón de enviar
                  '&:hover': {
                    bgcolor: '#0056b3',
                  },
                }}
                onClick={ModalState}
              >
                Enviar
              </Button>

              <Button
                variant="contained"
                color="secondary"
                sx={{
                  bgcolor: '#A0522D', // Color marrón para el botón de cancelar
                  '&:hover': {
                    bgcolor: '#8b4513',
                  },
                }}
                onClick={ModalState}
              >
                Cancelar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};


