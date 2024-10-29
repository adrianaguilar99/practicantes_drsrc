import { Box, Button } from "@mui/material";
import { RegisterRow } from "../../inputs/register-row.component";
import { enqueueSnackbar } from "notistack";
import { InputValidators } from "../../../functions/input-validators.functions";
import React, { useState } from "react";
import { FormModalProps } from "../../modals/form-modal.component";
import { patchComment } from "../../../api/interns/intern-comments/intern-comments.api";

export const CommentFormModal: React.FC<FormModalProps> = ({
    data,
    onCancel,
    onSuccess,
  }) => {
    const CommentId = data?.id;
    const [commentPosted, setCommentPosted] = React.useState<string>(data?.comment || "");
    const userToken = sessionStorage.getItem("_Token") || "";
  
    const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({
      commentPosted: undefined,
    });
  
  
    const SubmitForm = () => {
        const validators = InputValidators();
        const newErrors: { [key: string]: string | undefined } = {};
    
        const resultComment = validators.string(commentPosted);
        if (resultComment) {
          newErrors.commentPosted = resultComment;
        }
        setErrors(newErrors);


      if (!newErrors.commentPosted) {
        const userToken = sessionStorage.getItem("_Token") || "";
          patchComment(userToken, CommentId, {
            postedComment: commentPosted,
          })
            .then((data) => {
              if (data) {
                enqueueSnackbar("Comentario actualizado correctamente", {
                  variant: "success",
                });
                onSuccess();
                onCancel();
              }
            })
            .catch((error) => {
              enqueueSnackbar(
                "Error al actualizar la información del comentario: " + error,
                { variant: "error" }
              );
            });
        } 
        
      }
  
    return (
      <>
          <div className="form-modal">
            <div>
                <label>Comentario</label>
                <input
                  type="textarea"
                  value={commentPosted}
                  onChange={(e) => setCommentPosted(e.target.value)}
                />
            </div>
  
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{
                  bgcolor: "#007BFF",
                  "&:hover": { bgcolor: "#0056b3" },
                }}
                onClick={SubmitForm}
              >
                Aceptar
              </Button>
  
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  bgcolor: "#A0522D",
                  "&:hover": { bgcolor: "#8b4513" },
                }}
                onClick={onCancel}
              >
                Cancelar
              </Button>
            </Box>
          </div>
      </>
    );
  };
  