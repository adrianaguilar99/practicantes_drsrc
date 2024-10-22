import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SidebarState {
  index: number;
  openMenu: boolean;
  isSidebarOpen: boolean;
  subIndex: number | null; 
  isInternsDropdownOpen: boolean; 
  isUsersDropdownOpen: boolean;
}

const initialState: SidebarState = {
  index: 0,
  openMenu: true,
  subIndex: null,
  isSidebarOpen: false,
  isInternsDropdownOpen: JSON.parse(localStorage.getItem('isInternsDropdownOpen') || 'false'), 
  isUsersDropdownOpen: JSON.parse(localStorage.getItem('isInternsDropdownOpen') || 'false'), 
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setIndex(state, action: PayloadAction<number>) {
      state.index = action.payload;
    },
    setSubIndex: (state, action: PayloadAction<number | null>) => {
      state.subIndex = action.payload; 
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
      localStorage.setItem('isInternsDropdownOpen', JSON.stringify(action.payload));
    },
    setUsersDropdownOpen(state, action: PayloadAction<boolean>) {
      state.isUsersDropdownOpen = action.payload;
      localStorage.setItem('isUsersDropdownOpen', JSON.stringify(action.payload));
    },
  },
});

export const { setIndex,setSubIndex, setOpenMenu, toggleSidebar, setSidebarOpen, setInternsDropdownOpen , setUsersDropdownOpen } = sidebarSlice.actions;
export default sidebarSlice.reducer;
