import { Dialog, DialogContent, DialogContentText, DialogTitle, Modal } from "@mui/material"
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react"

interface InternSupervisorsModalProps {
    data?: any
    open: boolean
    ModalClose: () => void
}
export const InternSupervisorsModal: React.FC<InternSupervisorsModalProps> = ({ data, open, ModalClose}) => {
    return(
        <Dialog
        open={open}
        onClose={ModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{"Encargados del practicante"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {data.map((supervisor: any, index: any) => (
              <p key={index}>{supervisor.name}</p>
            ))}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    )
}