import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import RoutesConfig from "./routes/routes";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { store } from "./redux/sidebar-redux/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <RoutesConfig />
      </SnackbarProvider>
    </Provider>
  </StrictMode>
);
