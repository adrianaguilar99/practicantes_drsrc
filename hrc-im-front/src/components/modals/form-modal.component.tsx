import React, { useEffect } from 'react';
import { Modal, Box, Typography } from '@mui/material';
import { da } from 'date-fns/locale';
import { ReportGenerationModal } from './report-generation-modal.component';
import { DepartmentFormModal } from '../departments/departments-modal.component';
import { CareerFormModal } from '../interns/interns-careers-table/interns-careers-modal.component';
import { InstitutionFormModal } from '../interns/interns-institutions-table/interns-institutions-modal.component';
import { SupervisorFormModal } from '../supervisors/supervisors-modal.component';

interface FormModalPropsMain {
    open: boolean;
    onConfirm: () => void;  
    onCancel: () => void;   
    title: string;      
    type: string;  
    entity: string;
    data?: any;
    message?: string;       
  }

  export interface FormModalProps {
    type: string;
    data?: any;
    onCancel: () => void;
    onSuccess: () => void;
  }

  export const FormModal: React.FC<FormModalPropsMain> = ({ open, onCancel, onConfirm, title, type, entity,data }) => {
    return (
      <Modal open={open} onClose={onCancel}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: entity === "supervisors" ? '45vw' : entity === "institutions" ? '45vw' : '30vw',
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
            {entity === "departments" ? <DepartmentFormModal data={data} type={type} onCancel={onCancel} onSuccess={onConfirm} /> : null}
            {entity === "supervisors" ? <SupervisorFormModal data={data} type={type} onCancel={onCancel} onSuccess={onConfirm} /> : null}
            {entity === "interns-institutions" ? <InstitutionFormModal data={data} type={type} onCancel={onCancel} onSuccess={onConfirm} /> : null}
            {entity === "interns-careers" ? <CareerFormModal data={data} type={type} onCancel={onCancel} onSuccess={onConfirm} /> : null}
            {entity === "report" ? <ReportGenerationModal  onCancel={onCancel} onSuccess={onConfirm} /> : null}
          </Box>
        </Box>
      </Modal>
    );
  };
  