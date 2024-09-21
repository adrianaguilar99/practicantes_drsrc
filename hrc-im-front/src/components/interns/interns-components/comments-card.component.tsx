import { TimeAgo } from "./date-conversor.component";

interface CommentCardProps {
    name: string;
    time: string;
    comment: string;
  }
  

export const CommentCard : React.FC<CommentCardProps> = ({ name, time, comment}) => {
    return (
        <div className="comment-card">
            <div className="comment-card-header">
              <h4>{name}</h4><TimeAgo date={time} />
            </div>
            <div className="comment-card-body">
              <p>{comment}</p>
            </div>

        </div>
    );
}