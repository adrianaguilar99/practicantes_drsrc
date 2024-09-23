import React from 'react';
import { Modal, Box, Typography } from '@mui/material';
import { DepartmentFormModal, SupervisorFormModal } from './modal-forms.component';

interface FormModalProps {
    open: boolean;
    onConfirm: () => void;  
    onCancel: () => void;   
    title: string;      
    type: string;  
    entity: string;
    message: string;       
  }
  export const FormModal: React.FC<FormModalProps> = ({ open, onCancel, title, type, entity }) => {
    return (
      <Modal open={open} onClose={onCancel}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '30vw',
            bgcolor: '#EDEDED',
            borderRadius: '8px',
            boxShadow: 24,
            p: 0,
          }}
        >
          {/* Header modal */}
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
  
          {/* Modal body */}
          <Box
            sx={{
              p: 3,
            }}
          >
            {entity === "departments" ? <DepartmentFormModal type={type} onCancel={onCancel} /> : null}
            {entity === "supervisors" ? <SupervisorFormModal type={type} onCancel={onCancel} /> : null}
          </Box>
        </Box>
      </Modal>
    );
  };
  