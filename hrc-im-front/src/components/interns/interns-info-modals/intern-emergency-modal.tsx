import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
} from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  Key,
  useState,
} from "react";
import { a } from "@react-spring/web";
import { se } from "date-fns/locale";

interface InternEmergenciesModalProps {
  data?: any;
  open: boolean;
  ModalClose: () => void;
}
export const InternEmergenciesModal: React.FC<InternEmergenciesModalProps> = ({
  data,
  open,
  ModalClose,
}) => {
  const [mode, setMode] = useState("normal");
  function RemoveContact(index: any): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Dialog
      open={open}
      onClose={ModalClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiDialog-paper": {
          width: "100%",
          maxWidth: "600px",
          fontFamily: "Lato",
          fontSize: ".75rem",
        },
      }}
    >
      <DialogTitle>{"Contactos de emergencia"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {data.map((emergency: any, index: any) => (
            <div key={index} className="register-intern-contact-add">
              <AccountCircleRoundedIcon />
              <p>
                {emergency.name} ({emergency.relationship}) - {emergency.phone}
              </p>
              <div >
              <button hidden={mode != "edit"}><EditOutlinedIcon /></button>
              <button  hidden={mode != "edit"} onClick={() => RemoveContact(index)}>
                <RemoveRoundedIcon />
              </button>
              </div>
            

            </div>
          ))}
          <Box sx={{ display: "flex", justifyContent: "center", width: "100%",gap: "5%" }}>
            <button onClick={ () => setMode("edit")}>{mode != "normal" ? "Guardar" : "Editar"}</button>
            <button onClick={ModalClose}>Cancelar</button>
          </Box>
          
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
