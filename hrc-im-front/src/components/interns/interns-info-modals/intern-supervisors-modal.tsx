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
      <DialogTitle>{"Encargados del practicante"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {data.map((supervisor: any, index: any) => (
            <LightTooltip title={supervisor.user.email}>
              <div className="supervisor-info">
                <Avatar
                  {...stringAvatar(
                    supervisor.user.firstName + " " + supervisor.user.lastName,
                    30,
                    12
                  )}
                />
                <p>
                  {supervisor.user.firstName + " " + supervisor.user.lastName}
                </p>
              </div>
            </LightTooltip>
          ))}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
