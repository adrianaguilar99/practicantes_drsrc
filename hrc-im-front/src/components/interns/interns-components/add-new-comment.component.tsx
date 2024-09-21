
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
export const AddNewComment = () => {
    return (
        <div className="add-new-comment">
            <textarea placeholder="Escribe un comentario..."/>
            <button><AddCircleOutlineRoundedIcon /> Añadir comentario</button>
        </div>
    );
}