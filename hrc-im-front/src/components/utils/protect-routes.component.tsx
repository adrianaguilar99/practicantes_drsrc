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
  
  // Obtener el rol de Redux
  const userRole = useSelector((state: RootState) => state.auth.rol);

  useEffect(() => {
    // Verifica si el rol está en sessionStorage pero no en Redux
    const encryptedSessionRole = sessionStorage.getItem('_Rol');
    if (encryptedSessionRole && !userRole) {
      const decryptedSessionRole = decryptData(encryptedSessionRole); // Desencripta el rol
      dispatch(login(decryptedSessionRole)); // Actualiza Redux con el rol desencriptado
    }
  }, [userRole, dispatch]);

  // Caso donde no hay rol ni en Redux ni en sessionStorage
  if (!userRole && !sessionStorage.getItem('_Rol')) {
    return <Navigate to="/" />; // Redirige a la página de login si no hay rol
  }

  // Caso donde el rol está en Redux (o fue sincronizado) y está en el sessionStorage
  if (userRole) {
    const decryptedRole = decryptData(userRole); // Desencripta el rol

    // Si el rol desencriptado no coincide con los roles permitidos, redirige a "/404"
    if (!allowedRoles.includes(decryptedRole)) {
      return <Navigate to="/404" />;
    }

    // Si el rol coincide, se permite el acceso a la página
    return <>{children}</>;
  }

  // Evita errores de renderizado por si no se ha resuelto el estado del rol aún
  return null;
};

export default ProtectedRoute;
