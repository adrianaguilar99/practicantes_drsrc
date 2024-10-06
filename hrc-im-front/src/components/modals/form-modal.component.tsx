import React, { useEffect } from 'react';
import { Modal, Box, Typography } from '@mui/material';
import { CareerFormModal, DepartmentFormModal, InstitutionFormModal, SupervisorFormModal } from './modal-forms.component';
import { da } from 'date-fns/locale';

interface FormModalProps {
    open: boolean;
    onConfirm: () => void;  
    onCancel: () => void;   
    title: string;      
    type: string;  
    entity: string;
    data?: any;
    message?: string;       
  }

  export const FormModal: React.FC<FormModalProps> = ({ open, onCancel, title, type, entity,data }) => {
    const [Supervisordata, setSupervisordata] = React.useState<any>({});


    const SupervisorData = { name: "Luis Alberto", email: "q7YpK@example.com", department: "Sistemas" }

    useEffect (() => {
      setSupervisordata(SupervisorData);
    }, []);


    return (
      <Modal open={open} onClose={onCancel}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '35vw',
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
            <Typography variant="h6" component="h3" sx={{ fontSize: '.90rem', fontWeight: 'bold' }}>
              {title}
            </Typography>
          </Box>
  
          {/* Modal body */}
          <Box
            sx={{
              p: 3,
            }}
          >
            {entity === "departments" ? <DepartmentFormModal data={data} type={type} onCancel={onCancel} /> : null}
            {entity === "supervisors" ? <SupervisorFormModal data={data} type={type} onCancel={onCancel} /> : null}
            {entity === "interns-institutions" ? <InstitutionFormModal data={data} type={type} onCancel={onCancel} /> : null}
            {entity === "interns-careers" ? <CareerFormModal data={data} type={type} onCancel={onCancel} /> : null}
          </Box>
        </Box>
      </Modal>
    );
  };
  