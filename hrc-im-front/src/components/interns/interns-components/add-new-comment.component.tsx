import AddCommentIcon from '@mui/icons-material/AddComment';
import { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { postComment } from '../../../api/interns/intern-comments/intern-comments.api';
import { convertToken } from '../../../functions/auth.function';

interface AddNewCommentProps {
    internId: string;
    onSuccess: () => void;
}

export const AddNewComment: React.FC<AddNewCommentProps> = ({ internId, onSuccess }) => {
    const userToken = sessionStorage.getItem("_Token") || "";
    const [supervisorID , setSupervisorID] = useState<string>("");
    const [postCommentText, setPostCommentText] = useState<string>("");

    useEffect(() => {
        const parseToken = convertToken(userToken);
        console.log(parseToken);
        setSupervisorID(parseToken.sub);
    }, [userToken]);
       

    const SubmitForm = () => {
        if (postCommentText === "" || postCommentText.length < 4) {
          return;
        } else {
            postComment(userToken, {
                internId: internId,
                postedComment: postCommentText,
              }).then((data : any) => {
                  if (data) {
                      enqueueSnackbar("Comentario agregado correctamente", {
                        variant: "success",
                      });
                      onSuccess();
                      setPostCommentText("");
                  }        
              }).catch((error : any) => {
                enqueueSnackbar("Algo salió mal: " + error.message, {
                  variant: "error",
                });
              });
        }
    };
  
    return (
        <div className="add-new-comment">
            <textarea
                placeholder="Escribe un comentario..."
                onChange={(e) => setPostCommentText(e.target.value)}
                value={postCommentText}
            />
            <button onClick={SubmitForm}>
                <AddCommentIcon /> Añadir comentario
            </button>
        </div>
    );
};




// import AddCommentIcon from '@mui/icons-material/AddComment';
// import { useEffect, useState } from 'react';
// import { enqueueSnackbar } from 'notistack';
// import { postComment } from '../../../api/interns/intern-comments/intern-comments.api';
// import { convertToken } from '../../../functions/auth.function';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// interface AddNewCommentProps {
//     internId: string;
//     onSuccess: () => void;
// }

// export const AddNewComment: React.FC<AddNewCommentProps> = ({ internId, onSuccess }) => {
//     const userToken = sessionStorage.getItem("_Token") || "";
//     const [supervisorID, setSupervisorID] = useState<string>("");
//     const [postCommentText, setPostCommentText] = useState<string>("");

//     useEffect(() => {
//         const parseToken = convertToken(userToken);
//         console.log(parseToken);
//         setSupervisorID(parseToken.sub);
//     }, [userToken]);

//     const SubmitForm = () => {
//         if (postCommentText === "" || postCommentText.length < 4) {
//           return;
//         } else {
//             postComment(userToken, {
//                 internId: internId,
//                 postedComment: postCommentText,
//               }).then((data: any) => {
//                   if (data) {
//                       enqueueSnackbar("Comentario agregado correctamente", {
//                         variant: "success",
//                       });
//                       onSuccess();
//                       setPostCommentText("");
//                   }
//               }).catch((error: any) => {
//                 enqueueSnackbar("Algo salió mal: " + error.message, {
//                   variant: "error",
//                 });
//               });
//         }
//     };

//     const modules = {
//         toolbar: [
//             [{ 'align': [] }],                // Alineación
//             ['bold'],                         // Negrita
//             [{ 'list': 'ordered' }, { 'list': 'bullet' }]  // Listas
//         ]
//     };

//     return (
//         <div className="add-new-comment">
//             <ReactQuill
//                 placeholder="Escribe un comentarioaaaa..."
//                 value={postCommentText}
//                 onChange={setPostCommentText}
//                 modules={modules}
//                 theme="snow"
//                 style={{ width: '100%' }}
//             />
//             <button onClick={SubmitForm}>
//                 <AddCommentIcon /> Añadir comentario
//             </button>
//         </div>
//     );
// };
