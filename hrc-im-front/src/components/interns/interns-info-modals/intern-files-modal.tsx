import { Dialog, DialogContent, DialogContentText, DialogTitle, Modal } from "@mui/material"
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react"

interface InternFilesModalProps {
    data?: any
    open: boolean
    ModalClose: () => void
}
export const InternFilesModal: React.FC<InternFilesModalProps> = ({ data, open, ModalClose}) => {
    return(
        <Dialog
        open={open}
        onClose={ModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
           <DialogTitle>
                    {"Archivos del practicante"} 
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText >
                      {data.map((file : any, index: any) => (
                        <p key={index}>{file.name}</p>
                      ))}
                    </DialogContentText>
                  </DialogContent>
      </Dialog>
    )
}