import { DateConversor } from "../../../functions/date-conversor.function";
import { AddNewComment } from "./add-new-comment.component";
import { CommentCard } from "./comments-card.component";

export const CommentsTable = () => {
   const comments = [
    {
        id: 1,
        name: "JUAN JOSE",
        time: DateConversor("29/9/2024, 3:14:33 p.m."),
        comment: "Me parece muy bien! 🙌👍",
    },
    {
        id: 2,
        name: "BRIAN WILFRIDO ROMERO CUPUL",
        time: DateConversor("29/9/2024, 2:14:33 p.m."),
        comment: "Comentario 2",
    },
    {
        id: 3,
        name: "STEVEN RODRIGUEZ RODRIGUEZ",
        time: "2024-09-20T17:30:00",
        comment: "Comentario 3",
    },
    {
        id: 1,
        name: "JUAN JOSE",
        time: "2023-09-20T17:30:00",
        comment: "Me parece muy bien! 🙌👍",
    },
    {
        id: 1,
        name: "JUAN JOSE",
        time: "2024-09-20T12:30:00",
        comment: "Me parece muy bien! 🙌👍",
    },
    {
        id: 1,
        name: "JUAN JOSE",
        time: "2024-09-20T17:30:00",
        comment: "Me parece muy bien! 🙌👍",
    },
   ]
    return (
        <div>
            <h2 className="comments-title">{comments.length} Comentarios</h2>
            <AddNewComment />   
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