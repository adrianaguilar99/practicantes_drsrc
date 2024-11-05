import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import RoutesConfig from "./routes/routes";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ManageTokenModal } from "./components/modals/token_exp_modal.component";
import { ConnectionAlert } from "./components/utils/connection-alert.component";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        <RoutesConfig />
        <ManageTokenModal />
        <ConnectionAlert />
      </SnackbarProvider>
    </Provider>
  </StrictMode>
);
