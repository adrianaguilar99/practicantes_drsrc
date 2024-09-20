interface CommentCardProps {
    name: string;
    time: string;
    comment: string;
  }
  

export const CommentCard : React.FC<CommentCardProps> = ({ name, time, comment}) => {
    return (
        <div className="comment-card">
            <p>{name}</p>
            <p>{comment}</p>
            <p>{time}</p>

        </div>
    );
}