import { CommentCard } from "./comments-card.component";

export const CommentsTable = () => {
   const comments = [
    {
        id: 1,
        name: "JUAN JOSE",
        time: "01/01/2022",
        comment: "Comentario 1",
    },
    {
        id: 2,
        name: "BRIAN WILFRIDO ROMERO CUPUL",
        time: "01/01/2022",
        comment: "Comentario 2",
    },
    {
        id: 3,
        name: "STEVEN RODRIGUEZ RODRIGUEZ",
        time: "01/01/2022",
        comment: "Comentario 3",
    },
   ]
    return (
        <div>
            <h2 className="comments-title">{comments.length} Comentarios</h2>
            <div className="comments-table">
                {comments.map((comment, index) => (
                    <CommentCard
                        key={index}
                        name={comment.name}
                        time={comment.time}
                        comment={comment.comment}
                    />
                ))}
            </div>
        </div>
       
    );

}