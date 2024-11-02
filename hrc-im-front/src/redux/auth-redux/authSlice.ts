import { createSlice } from '@reduxjs/toolkit';

const getStoredRole = () => {
  return sessionStorage.getItem('_Role') || null; 
};
const getStoredUserName = () => sessionStorage.getItem('_ProfileName') || null;



const setStoredUserName = (name: string) => sessionStorage.setItem('_ProfileName', name);
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
  isLoaded: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.rol = action.payload;
      state.userName = action.payload.userName;
      setStoredRole(action.payload);
      setStoredUserName(action.payload.userName);  
    },
    logout: (state) => {
      state.rol = null;
      state.userName = null;
      state.isLoaded = false;
      clearStoredRole(); 
      clearStoredUserName();
    },
    setIsLoaded: (state, action) => {
      state.isLoaded = action.payload;  
    },
  },
});

export const { login, logout, setIsLoaded } = authSlice.actions;

export default authSlice.reducer;
