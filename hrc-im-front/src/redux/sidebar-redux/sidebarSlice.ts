// src/redux/sidebarSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SidebarState {
  index: number;
  openMenu: boolean;
  isSidebarOpen: boolean;
}

const initialState: SidebarState = {
  index: 0,
  openMenu: true,
  isSidebarOpen: false,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setIndex(state, action: PayloadAction<number>) {
      state.index = action.payload;
    },
    setOpenMenu(state, action: PayloadAction<boolean>) {
      state.openMenu = action.payload;
    },
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { setIndex, setOpenMenu, toggleSidebar, setSidebarOpen } = sidebarSlice.actions;
export default sidebarSlice.reducer;