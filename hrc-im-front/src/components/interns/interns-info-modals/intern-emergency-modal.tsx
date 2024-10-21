import { Dialog, DialogContent, DialogContentText, DialogTitle, Modal } from "@mui/material"
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react"

interface InternEmergenciesModalProps {
    data?: any
    open: boolean
    ModalClose: () => void
}
export const InternEmergenciesModal: React.FC<InternEmergenciesModalProps> = ({ data, open, ModalClose}) => {
    return(
        <Dialog
        open={open}
        onClose={ModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
           <DialogTitle>{"Contactos de emergencia"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      {data.map((emergency: any, index: any) => (
                        <div>
                          <p key={index}>{emergency.name}</p>
                          <p>{emergency.parentesco}</p>
                          <p>{emergency.phone}</p>
                        </div>
                      ))}
                    </DialogContentText>
                  </DialogContent>
      </Dialog>
    )
}