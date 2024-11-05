import { createSlice } from '@reduxjs/toolkit';

const getStoredUserName = () => sessionStorage.getItem('_ProfileName') || null;
const setStoredUserName = (name: string) => sessionStorage.setItem('_ProfileName', name);

const initialState = {
  userName: getStoredUserName(),
  notificationsLength: 0, // Nuevo campo para almacenar la longitud de las notificaciones
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUserNameRedux: (state, action) => {
      state.userName = action.payload;
      setStoredUserName(action.payload);
    },
    clearUserName: (state) => {
      state.userName = null;
      sessionStorage.removeItem('_ProfileName');
    },
    setNotificationsLength: (state, action) => {
      state.notificationsLength = action.payload; 
    },
  },
});

export const { setUserNameRedux, clearUserName, setNotificationsLength } = profileSlice.actions;
export default profileSlice.reducer;
