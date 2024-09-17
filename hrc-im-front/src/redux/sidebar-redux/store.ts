import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './sidebarSlice';

const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('sidebarState', serializedState);
  } catch (e) {
    console.error("No se pudo guardar el estado", e);
  }
};

const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem('sidebarState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("No se pudo cargar el estado", e);
    return undefined;
  }
};


const persistedState = loadState();

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
  },
  preloadedState: {
    sidebar: persistedState || undefined,
  },
});

store.subscribe(() => {
  saveState(store.getState().sidebar);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
