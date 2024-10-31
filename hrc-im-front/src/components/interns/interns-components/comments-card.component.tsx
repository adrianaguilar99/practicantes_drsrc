import { Avatar, IconButton } from "@mui/material";
import { TimeAgo } from "./date-conversor.component";
import { stringAvatar } from "../../../functions/utils.functions";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { decryptData } from "../../../functions/encrypt-data.function";
import { useState } from "react";
import { FormModal } from "../../modals/form-modal.component";

interface CommentCardProps {
    id: string;
    name: string;
    time: string;
    timeUpdated: string;
    comment: string;
    onUpdate: () => void;
}

export const CommentCard: React.FC<CommentCardProps> = ({ id, name, time, timeUpdated, comment, onUpdate }) => {
    const userFullName = sessionStorage.getItem('_ProfileName');
    const userRol = useSelector((state: RootState) => decryptData(state.auth.rol || "") || "");
    const [isHovered, setIsHovered] = useState(false);
    const [open, setOpen] = useState(false);
    const isOwner = userFullName === name || userRol === "ADMINISTRATOR";
    const showOptions = isOwner || userRol === "ADMINISTRATOR";

    const ModalClose = () => {
        setOpen(false); 
      };
    return (
        <div 
            className={`comment-card ${isOwner ? 'mine' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="comment-card-content">
                <div className="comment-card-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Avatar {...stringAvatar(name, 30, 12)} />
                        <h4>{name}</h4>
                    </div>
                    <TimeAgo date={time} />
                    {timeUpdated != time && <p>Editado</p>}
                </div>
                <div className="comment-card-body">
                    <p>{comment}</p>
                    {/* <div
                    className="rendered-comment"
                    dangerouslySetInnerHTML={{ __html: comment }}
                /> */}
               
                </div>
            </div>
            {(showOptions && isHovered) && (
                <div className="comment-card-options">
                    <IconButton onClick={() => setOpen(true)}>
                        <EditOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                </div>
            )}
        <FormModal
          open={open}
          onConfirm={onUpdate}
          type="Edit"
          onCancel={ModalClose}
          data={{id: id, comment : comment}}
          title="Editar Comentario"
          entity={"comment"}
        />
        </div>
    );
};
