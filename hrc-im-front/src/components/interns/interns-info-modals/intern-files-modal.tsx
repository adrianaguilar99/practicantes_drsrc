import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState, useEffect } from "react";
import {
  getFiles,
  getFilesSPLIT,
  patchInternFiles,
} from "../../../api/interns/intern-files/intern-files.api";
import { InternFilesInterface } from "../../../interfaces/interns/intern-files/intern-files.interface";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { ButtonComponent } from "../../buttons/buttons.component";
import { RegisterRow } from "../../inputs/register-row.component";
import { InputValidators } from "../../../functions/input-validators.functions";
import { enqueueSnackbar } from "notistack";

interface InternFilesModalProps {
  internId: string;
  filesId: string;
  open: boolean;
  onUpdate: () => void;
  ModalClose: () => void;
}

export const InternFilesModal: React.FC<InternFilesModalProps> = ({
  internId,
  filesId,
  open,
  onUpdate,
  ModalClose,
}) => {
  const [photo, setPhoto] = useState("");
  const [compiledDocuments, setCompiledDocuments] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [newInternPicture, setNewInternPicture] = useState<File | null>(null);
  const [newInternFile, setNewInternFile] = useState<File | null>(null);
  const [mode, setMode] = useState("view");

  const userToken = sessionStorage.getItem("_Token") || "";

  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({
    internPicture: undefined,
    internFiles: undefined,
  });

  const fetchData = async () => {
    try {
      const response: any = await getFiles(userToken, filesId);
      const { photo, compiledDocuments } = response.data;
      setPhoto(photo);
      setCompiledDocuments(compiledDocuments);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFiles = async () => {
    const photoName = photo.split("/").pop();
    const fileName = compiledDocuments.split("/").pop();

    try {
      const photoBlob = await getFilesSPLIT(
        userToken,
        internId,
        photoName || ""
      );
      if (photoBlob) {
        const photoObjectUrl = URL.createObjectURL(photoBlob);
        setPhotoUrl(photoObjectUrl);
      }

      const fileBlob = await getFilesSPLIT(userToken, internId, fileName || "");
      if (fileBlob) {
        const fileObjectUrl = URL.createObjectURL(fileBlob);
        setFileUrl(fileObjectUrl);
      }
    } catch (error) {
      console.error("Error en fetchFiles:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userToken, filesId]);

  useEffect(() => {
    if (photo && compiledDocuments) {
      fetchFiles();
    }
  }, [photo, compiledDocuments]);

  const SubmitForm = () => {
    const validators = InputValidators();
    const newErrors: { [key: string]: string | undefined } = {};
    const resultPhoto = validators.fileImage(newInternPicture as File);
    if (resultPhoto) {
      newErrors.internPicture = resultPhoto;
    }
  
    const resultFile = validators.filePDF(newInternFile as File);
    if (resultFile) {
      newErrors.internFiles = resultFile;
    }
  
    setErrors(newErrors);
  
    if (!newErrors.internPicture && !newErrors.internFiles) {
      const formData = new FormData();
      formData.append("photo", newInternPicture as File);
      formData.append("compiledDocuments", newInternFile as File);
  
      patchInternFiles(userToken, filesId, formData, internId)
        .then(() => {
          ModalClose();
          enqueueSnackbar("Archivos del practicante actualizados correctamente", {
            variant: "success",
          });
          onUpdate();
        })
        .catch((error) => {
          enqueueSnackbar("Algo salió mal: " + error, {
            variant: "error",
          });
        });
    }
  };
  

  return (
    <Dialog
    open={open}
    onClose={ModalClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle
      sx={{
        bgcolor: "#2E3B4E", 
        color: "#fff",      
        padding: 2,
        textAlign: "start",
        fontSize: ".9rem",
        height: 5,
        lineHeight: 1,
      }}
    >
      {"Archivos del practicante"}
    </DialogTitle>
    <DialogContent
    sx={{
      backgroundColor: "#EDEDED",
    }
    }
    >
      <DialogContentText sx={{ marginTop: 2 }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {photoUrl && fileUrl && mode === "view" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: "300px" }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<InsertPhotoIcon />}
                onClick={() => window.open(photoUrl, "_blank")}
              >
                Ver foto
              </Button>
  
              <Button
                variant="contained"
                color="error"
                startIcon={<InsertDriveFileIcon />}
                onClick={() => window.open(fileUrl, "_blank")}
              >
                Ver PDF
              </Button>
            </div>
          ) : (
            <>
              <RegisterRow
                label="Foto:"
                onChange={(file) => setNewInternPicture(file as File)}
                id="internPicture"
                type="file"
                show={true}
                validate={errors.internPicture ? "Error" : "Normal"}
                typeError={errors.internPicture}
                accept=".jpg, .jpeg, .png"
              />
              <RegisterRow
                label="Archivos del practicante:"
                onChange={(file) => setNewInternFile(file as File)}
                id="internFiles"
                type="file"
                show={true}
                validate={errors.internFiles ? "Error" : "Normal"}
                typeError={errors.internFiles}
                accept=".pdf"
              />
            </>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: mode === "view" ? "center" : "space-between",
              alignItems: "flex-end",
              marginTop: 6,
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              sx={{
                bgcolor: "#B88A54",
                "&:hover": { bgcolor: "#B98A54" },
              }}
              onClick={() => {mode === "view" ? setMode("edit") : SubmitForm()}} 
            >
              {mode === "view" ? "Editar" : "Guardar"}
            </Button>
            {mode === "edit" && (
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  bgcolor: "#A0522D",
                  "&:hover": { bgcolor: "#8b4513" },
                }}
                onClick={() => setMode("view")}
              >
                Cancelar
              </Button>
            )}
          </Box>
        </div>
      </DialogContentText>
    </DialogContent>
  </Dialog>  
  );
};
