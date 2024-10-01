import { createSlice } from '@reduxjs/toolkit';

// Función para obtener el rol desde sessionStorage
const getStoredRole = () => {
  return sessionStorage.getItem('_Role') || null; 
};
const getStoredUserName = () => sessionStorage.getItem('_ProfileName') || null;



const setStoredUserName = (name: string) => sessionStorage.setItem('_ProfileName', name);
// Función para borrar el rol del sessionStorage
const clearStoredRole = () => {
  sessionStorage.removeItem('_Role');
};
const clearStoredUserName = () => sessionStorage.removeItem('_ProfileName');

const setStoredRole = (role: string) => {
  sessionStorage.setItem('_Role', role);
};

const initialState = {
  rol: getStoredRole(),
  userName: getStoredUserName(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Acción para iniciar sesión
    login: (state, action) => {
      state.rol = action.payload;
      state.userName = action.payload.userName;
      setStoredRole(action.payload);
      setStoredUserName(action.payload.userName);  
    },
    // Acción para cerrar sesión
    logout: (state) => {
      state.rol = null;
      state.userName = null;
      clearStoredRole(); 
      clearStoredUserName();
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
