import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ConfirmationModal } from './confirmation-modal.component';
import { logout } from '../../redux/auth-redux/authSlice';
import { enqueueSnackbar } from 'notistack';
import { getNewToken } from '../../api/api-request';
import { convertToken } from '../../functions/auth.function';

export function ManageTokenModal() {
    const dispatch = useDispatch();
    const [saveEdit, setSaveEdit] = useState(false); 

  
    useEffect(() => {
    }, []); 

    useEffect(() => {
        const interval = setInterval(() => {
            const expTime = sessionStorage.getItem('_exp_token');
            if (expTime) {
                const currentTime = Math.floor(Date.now() / 1000);
                const expTimeNumber = parseFloat(expTime); 
                if (currentTime > expTimeNumber) {
                    setSaveEdit(true);
                }
            }
        }, 1000); 

        return () => clearInterval(interval); 
    }, []);

    const handleConfirmSave = async () => {
       
        const token = await getNewToken(sessionStorage.getItem('_refreshToken') as string);
        
        if (token) {
            const parsedToken = convertToken(token.accessToken);
            sessionStorage.setItem('_Token', token.accessToken);
            sessionStorage.setItem('_refreshToken', token.refreshToken);
            sessionStorage.setItem('_exp_token', parsedToken.exp.toString());
            console.log(token);
            setSaveEdit(false);
            enqueueSnackbar('La sesión se ha actualizado', { variant: 'success' });
        }
        else{
            enqueueSnackbar('Error al actualizar la sesión', { variant: 'error' });
        }
       
    };
    const handleCancelSave = () => {
        enqueueSnackbar('La sesión ha expirado', { variant: 'info' });
        setSaveEdit(false);
        dispatch(logout()); 
        sessionStorage.clear();
        window.location.href = '/'; 
        
    };
    

    return (
        <>
            {saveEdit && (
                <ConfirmationModal
                    open={saveEdit}
                    onConfirm={handleConfirmSave}
                    onCancel={handleCancelSave}
                    title="Sesión expirada"
                    message="¿Quieres mantener la sesión?"
                />
            )}
        </>
    );
}

