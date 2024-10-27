import { Avatar } from "@mui/material";
import { TimeAgo } from "./date-conversor.component";
import { stringAvatar } from "../../../functions/utils.functions";

interface CommentCardProps {
    name: string;
    time: string;
    comment: string;
  }
  

export const CommentCard : React.FC<CommentCardProps> = ({ name, time, comment}) => {
    return (
        <div className="comment-card">
            <div className="comment-card-header">
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <Avatar {...stringAvatar(name, 30,12) } /> <h4>{name}</h4>
            </div>
        <TimeAgo date={time} />
            </div>
            <div className="comment-card-body">
              <p>{comment}</p>
            </div>

        </div>
    );
}