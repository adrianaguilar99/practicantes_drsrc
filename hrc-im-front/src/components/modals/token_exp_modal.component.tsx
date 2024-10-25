import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { ConfirmationModal } from './confirmation-modal.component';
import { logout } from '../../redux/auth-redux/authSlice';
import { enqueueSnackbar } from 'notistack';
import { getNewToken } from '../../api/api-request';
import { convertToken } from '../../functions/auth.function';
import { parseTimeString } from '../../functions/utils.functions';

export const ManageTokenModal = () => {
    const dispatch = useDispatch();
    const [saveEdit, setSaveEdit] = useState(false);
    const [userIsActive, setUserIsActive] = useState(false);
    const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const autoCancelTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const INACTIVITY_LIMIT = parseTimeString('15m'); 
    const REFRESH_BEFORE_EXPIRATION = 60; 

    const getRefreshToken = () => sessionStorage.getItem('_refreshToken');
    const getExpirationTime = () => parseInt(sessionStorage.getItem('_exp_token') || '0', 10);

    const resetInactivityTimeout = () => {
        setUserIsActive(true);
        if (inactivityTimeoutRef.current) {
            clearTimeout(inactivityTimeoutRef.current);
        }
        inactivityTimeoutRef.current = setTimeout(() => {
            setSaveEdit(true);
            setUserIsActive(false);
            setAutoCancelTimeout(); 
        }, INACTIVITY_LIMIT);
    };

    const setRefreshTimeout = (expirationTime: number) => {
        const currentTime = Math.floor(Date.now() / 1000);
        const refreshTime = (expirationTime - REFRESH_BEFORE_EXPIRATION) - currentTime;

        if (refreshTime > 0) {
            if (refreshTimeoutRef.current) {
                clearTimeout(refreshTimeoutRef.current);
            }

            refreshTimeoutRef.current = setTimeout(() => {
                if (userIsActive && !saveEdit) {
                    ConfirmSave();
                }
            }, refreshTime * 1000);
        }
    };
    const setAutoCancelTimeout = () => {
        const expirationTime = getExpirationTime();
        const currentTime = Math.floor(Date.now() / 1000);
        const timeBeforeAutoCancel = expirationTime - 60 - currentTime; 

        if (autoCancelTimeoutRef.current) {
            clearTimeout(autoCancelTimeoutRef.current);
        }

        if (timeBeforeAutoCancel > 0 && saveEdit) {
            autoCancelTimeoutRef.current = setTimeout(() => {
                CancelSave();
            }, timeBeforeAutoCancel * 1000);
        }
    };

    useEffect(() => {
        const refreshToken = getRefreshToken();
        const expirationTime = getExpirationTime();

        if (refreshToken && expirationTime) {
            resetInactivityTimeout();
            setRefreshTimeout(expirationTime);

            const handleUserActivity = () => {
                if (!saveEdit) {
                    resetInactivityTimeout();
                }
            };
            window.addEventListener('click', handleUserActivity);
            window.addEventListener('keydown', handleUserActivity);

            return () => {
                window.removeEventListener('click', handleUserActivity);
                window.removeEventListener('keydown', handleUserActivity);
                if (inactivityTimeoutRef.current) clearTimeout(inactivityTimeoutRef.current);
                if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current);
                if (autoCancelTimeoutRef.current) clearTimeout(autoCancelTimeoutRef.current);
            };
        }
    }, [INACTIVITY_LIMIT, userIsActive, saveEdit]);

    const ConfirmSave = async () => {
        const refreshToken = getRefreshToken();
        if (!refreshToken) return;

        const token = await getNewToken(refreshToken);
        
        if (token) {
            const parsedToken = convertToken(token.accessToken);
            sessionStorage.setItem('_Token', token.accessToken);
            sessionStorage.setItem('_refreshToken', token.refreshToken);
            sessionStorage.setItem('_exp_token', parsedToken.exp.toString());
            setSaveEdit(false);
            enqueueSnackbar('La sesión se ha actualizado', { variant: 'success' });
            resetInactivityTimeout();
            setRefreshTimeout(parsedToken.exp);
        } else {
            enqueueSnackbar('Error al actualizar la sesión', { variant: 'error' });
            CancelSave();
        }
    };

    const CancelSave = () => {
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
                    onConfirm={ConfirmSave}
                    onCancel={CancelSave}
                    title="Sesión expirada"
                    message="¿Quieres mantener la sesión?"
                />
            )}
        </>
    );
};
