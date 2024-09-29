import { createSlice } from '@reduxjs/toolkit';

// Función para obtener el rol desde sessionStorage
const getStoredRole = () => {
  return sessionStorage.getItem('_Role') || null; 
};

// Función para borrar el rol del sessionStorage
const clearStoredRole = () => {
  sessionStorage.removeItem('_Role');
};

const setStoredRole = (role: string) => {
  sessionStorage.setItem('_Role', role);
};

const initialState = {
  rol: getStoredRole(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Acción para iniciar sesión
    login: (state, action) => {
      state.rol = action.payload;
      setStoredRole(action.payload); // Guardar el rol en sessionStorage
    },
    // Acción para cerrar sesión
    logout: (state) => {
      state.rol = null;
      clearStoredRole(); // Borrar el rol del sessionStorage
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
