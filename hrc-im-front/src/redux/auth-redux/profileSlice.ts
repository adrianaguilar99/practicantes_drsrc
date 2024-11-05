import { createSlice } from '@reduxjs/toolkit';

const getStoredUserName = () => sessionStorage.getItem('_ProfileName') || null;
const setStoredUserName = (name: string) => sessionStorage.setItem('_ProfileName', name);

const initialState = {
  userName: getStoredUserName(),  
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
  },
});

export const { setUserNameRedux, clearUserName } = profileSlice.actions;
export default profileSlice.reducer;
