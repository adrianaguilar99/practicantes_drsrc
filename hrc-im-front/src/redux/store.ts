import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './sidebar-redux/sidebarSlice';
import authReducer from './auth-redux/authSlice';

const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('appState', serializedState);
  } catch (e) {
    console.error("No se pudo guardar el estado", e);
  }
};

const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem('appState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("No se pudo cargar el estado", e);
    return undefined;
  }
};

// Cargar el estado persistido del sessionStorage
const persistedState = loadState();

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    auth: authReducer,
  },
  // Asegúrate de que `persistedState` esté correctamente asignado a cada reducer.
  preloadedState: persistedState ? {
    sidebar: persistedState.sidebar,
    auth: persistedState.auth,
  } : undefined,
});

store.subscribe(() => {
  // Solo guarda los estados de `sidebar` y `auth` para evitar guardar otros estados innecesarios.
  saveState({
    sidebar: store.getState().sidebar,
    auth: store.getState().auth,
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
