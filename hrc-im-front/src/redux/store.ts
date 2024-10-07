import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './sidebar-redux/sidebarSlice';
import authReducer from './auth-redux/authSlice';
import profileReducer from './auth-redux/profileSlice';

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

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    auth: authReducer,
    profile: profileReducer,
  },

  preloadedState: persistedState ? {
    sidebar: persistedState.sidebar,
    auth: persistedState.auth,
    profile: persistedState.profile,
  } : undefined,
});

store.subscribe(() => {
  saveState({
    sidebar: store.getState().sidebar,
    auth: store.getState().auth,
    profile: store.getState().profile,
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
