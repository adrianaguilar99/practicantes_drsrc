import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SidebarState {
  index: number;
  openMenu: boolean;
  isSidebarOpen: boolean;
  isInternsDropdownOpen: boolean; // Nuevo estado para el dropdown
}

const initialState: SidebarState = {
  index: 0,
  openMenu: true,
  isSidebarOpen: false,
  isInternsDropdownOpen: JSON.parse(localStorage.getItem('isInternsDropdownOpen') || 'false'), // Inicializar desde localStorage
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
    setInternsDropdownOpen(state, action: PayloadAction<boolean>) {
      state.isInternsDropdownOpen = action.payload;
      localStorage.setItem('isInternsDropdownOpen', JSON.stringify(action.payload)); // Guardar en localStorage
    },
  },
});

export const { setIndex, setOpenMenu, toggleSidebar, setSidebarOpen, setInternsDropdownOpen } = sidebarSlice.actions;
export default sidebarSlice.reducer;
