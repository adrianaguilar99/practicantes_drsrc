import {
  Avatar,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
} from "@mui/material";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  Key,
} from "react";
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { stringAvatar } from "../../../functions/utils.functions";

interface InternSupervisorsModalProps {
  data?: any;
  open: boolean;
  ModalClose: () => void;
}
export const InternSupervisorsModal: React.FC<InternSupervisorsModalProps> = ({
  data,
  open,
  ModalClose,
}) => {
  const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} placement="right" />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }));
  return (
    <Dialog
      open={open}
      onClose={ModalClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
       <DialogTitle
      sx={{
        bgcolor: "#2E3B4E", 
        color: "#fff",      
        padding: 2,
        textAlign: "start",
        fontSize: ".9rem",
        height: 5,
        lineHeight: 1,
      }}
    >
      {"Encargados"}
    </DialogTitle>
      <DialogContent sx={{
      backgroundColor: "#EDEDED",
    }}>
        <DialogContentText>
          {data.map((supervisor: any, index: any) => (
            
              <div className="supervisor-info">
                
                <Avatar
                  {...stringAvatar(
                    supervisor.user.firstName + " " + supervisor.user.lastName,
                    30,
                    12
                  )}
                />
                <LightTooltip title={supervisor.user.email}>
                <p>
                  {supervisor.user.firstName + " " + supervisor.user.lastName}
                </p>
                </LightTooltip>
              </div>
        
          ))}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
