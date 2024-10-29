import { useEffect, useState } from "react";
import { DateConversor } from "../../../functions/date-conversor.function";
import { AddNewComment } from "./add-new-comment.component";
import { CommentCard } from "./comments-card.component";
import { CommentsOfInternInterface, DataComment } from "../../../interfaces/interns/intern-comments/intern-comments.interface";
import { RetryElement } from "../../utils/retry-element.component";
import { CircularProgress, NothingToSee } from "../../utils/circular-progress.component";
import { getCommentsByInternId } from "../../../api/interns/intern-comments/intern-comments.api";
import { da } from "date-fns/locale";
interface CommentCardProps {
    internId: string;
}
export const CommentsTable : React.FC<CommentCardProps> = ({ internId } ) => {
    const [data, setData] = useState<DataComment[]>([]);
    const [isLoading, setIsLoading] = useState(true); 
    const [hasError, setHasError] = useState(false);   
    const userToken = sessionStorage.getItem("_Token") || "";

    const fetchData = async () => {
        setIsLoading(true);
        try {
          const fetchedData: CommentsOfInternInterface  | null = await getCommentsByInternId(userToken, internId);
          if (fetchedData && fetchedData.data.length > 0) {
            setData(fetchedData.data);
            setHasError(false); 
          } else if (fetchedData && fetchedData.data.length === 0) {
            setData([]);
            setHasError(false);
          } else {
            setHasError(true);
          }
        } catch (error) {
          setHasError(true);
        } finally {
          setIsLoading(false);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, [userToken]);
    const PostSuccess = () => {
        fetchData();
    
      };
   
    return (
        <div>
            <h2 className="comments-title"> {"( " + data.length + " )"} {data.length === 1 ? "Comentario" : "Comentarios"}</h2>
            <AddNewComment onSuccess={PostSuccess} internId={internId} />   
            <div className="comments-table">
            {isLoading ? (
              <CircularProgress type="secondary" />
            ) : hasError ? (
               <RetryElement onClick={() => fetchData()}/>
            ) : data.length === 0 ? (
              <h2 className="comments-title">No hay comentarios</h2>
            ) : (
                data.map((comment, index) => (
                    <CommentCard
                        key={index}
                        id={comment.id}
                        name={comment.user.firstName + " " + comment.user.lastName}
                        time={comment.createdAt.toString()}
                        comment={comment.postedComment}
                        timeUpdated={comment.updatedAt.toString()}
                        onUpdate={fetchData}
                    />
                ))
            )}
               
            </div>
        </div>
       
    );

}