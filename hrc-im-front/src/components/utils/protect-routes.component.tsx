import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { decryptData } from '../../functions/encrypt-data.function';
import { login } from '../../redux/auth-redux/authSlice';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[]; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const dispatch = useDispatch();
  const userRole = useSelector((state: RootState) => state.auth.rol);

  useEffect(() => {
    const encryptedSessionRole = sessionStorage.getItem('_Rol');
    if (encryptedSessionRole && !userRole) {
      const decryptedSessionRole = decryptData(encryptedSessionRole); 
      dispatch(login(decryptedSessionRole)); 
    }
  }, [userRole, dispatch]);
  if (!userRole && !sessionStorage.getItem('_Rol')) {
    return <Navigate to="/loading-page" />; 
  }
  if (userRole) {
    const decryptedRole = decryptData(userRole); 
    if (!allowedRoles.includes(decryptedRole)) {
      return <Navigate to="/not-found-page" />;
    }
    return <>{children}</>;
  }
  return null;
};

export default ProtectedRoute;
