import { Avatar, Dialog, DialogContent, DialogContentText, DialogTitle, Modal, Tooltip } from "@mui/material"
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react"
import { stringAvatar } from "../../../functions/utils.functions"

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
              <Tooltip title={supervisor.user.email} placement="right"> 
              <div className="supervisor-info">
                <Avatar {...stringAvatar(supervisor.user.firstName + " " + supervisor.user.lastName, 30,12) } />  
                   <p>{supervisor.user.firstName + " " + supervisor.user.lastName}</p> 
              </div>
              </Tooltip>
            ))}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    )
}