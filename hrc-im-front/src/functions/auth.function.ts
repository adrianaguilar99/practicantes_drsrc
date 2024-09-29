import { useDispatch } from 'react-redux';
import { login, logout } from '../redux/auth-redux/authSlice'; // Asegúrate de que la ruta sea correcta
import { encryptData } from './encrypt-data.function';
import { se } from 'date-fns/locale';


export function useGetAccessToken() {
    const dispatch = useDispatch();

    const getAccessToken = () => {
        console.log('Obteniendo el token...');
        const token = sessionStorage.getItem('_Token');
        console.log('token obtenido:', token); // Muestra el token

        if (!token) {
            throw new Error('No se encontró el token en sessionStorage');
        }

        const tokenData = convertToken(token); // Convierte el token para obtener los datos necesarios

        // Guardar el rol en Redux al iniciar sesión
        if (tokenData.role) {
            const encryptedRole = encryptData(tokenData.role); // Encriptamos el rol
            sessionStorage.setItem('_Role', encryptedRole); // Guarda el rol encriptado bajo la clave '_Rol'
            dispatch(login(encryptedRole)); // Despachamos el rol no encriptado a Redux
        } else {
            throw new Error('No se encontró el rol en el token');
        }

        // Verifica si el token ha expirado
        const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
        if (tokenData.exp && currentTime > tokenData.exp) {
            throw new Error('El token ha expirado');
        } else if (tokenData.exp) {
            const expirationDate = new Date(tokenData.exp * 1000);
            sessionStorage.setItem('_exp_token', tokenData.exp.toString());
            console.log(`El token expira el: ${expirationDate.toLocaleString()}`);
        }

        return tokenData; // Retorna los datos del token
    };

    return getAccessToken;
}


export function convertToken(accessToken: string) {
    console.log('convirtiendo el token...');
    console.log('convertir token', accessToken);
    const parts = accessToken.split('.');
    if (parts.length !== 3) {
        throw new Error('El token JWT no es válido');
    }

    const payload = parts[1];
    const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    const tokenData = JSON.parse(decodedPayload);
    console.log('tokenData', tokenData);
    return tokenData; 
}


export function useLogout() {
    const dispatch = useDispatch();
    const logoutfunction = () => {
        sessionStorage.clear();
        dispatch(login(''));
        dispatch(logout());
    };
    return logoutfunction ;
}