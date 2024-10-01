import { createSlice } from '@reduxjs/toolkit';

// Función para obtener el nombre desde sessionStorage
const getStoredUserName = () => sessionStorage.getItem('_ProfileName') || null;

// Función para establecer el nombre en sessionStorage
const setStoredUserName = (name: string) => sessionStorage.setItem('_ProfileName', name);

const initialState = {
  userName: getStoredUserName(),  // Inicializa con el nombre de sessionStorage si existe
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // Acción para establecer el nombre de usuario
    setUserNameRedux: (state, action) => {
      state.userName = action.payload;
      setStoredUserName(action.payload);  // Guarda el nombre en sessionStorage
    },
    // Acción opcional para limpiar el nombre de usuario
    clearUserName: (state) => {
      state.userName = null;
      sessionStorage.removeItem('_ProfileName');  // Limpia el sessionStorage
    },
  },
});

export const { setUserNameRedux, clearUserName } = profileSlice.actions;
export default profileSlice.reducer;
