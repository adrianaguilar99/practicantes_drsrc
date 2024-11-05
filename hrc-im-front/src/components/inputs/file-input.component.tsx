import { useState } from "react";
import { useDropzone, Accept } from "react-dropzone";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CloseIcon from "@mui/icons-material/Close";

export const imageAccept: Accept = {
    "image/jpeg": [".jpeg", ".jpg"],
    "image/png": [".png"],
  };

  export const pdfAccept: Accept = {
    "application/pdf": [".pdf"],
  };
type FileUploadProps = {
    label: string;
    accept: Accept;
    onChange: (file: File | null) => void;
  };
  
  export const FileUpload: React.FC<FileUploadProps> = ({ label, accept, onChange }) => {
    const [file, setFile] = useState<File | null>(null);
  
    const onDrop = (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const uploadedFile = acceptedFiles[0];
        setFile(uploadedFile);
        onChange(uploadedFile);
      }
    };
  
    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept ,
      multiple: false,
    });
  
    const removeFile = () => {
      setFile(null);
      onChange(null);
    };
  
    return (
      <div>
        <label>{label}</label>
        {file ? (
          <div className="file-container">
            {/* Icon depending on file type */}
            {file.type.includes("image") ? (
              <ImageIcon style={{ color: "blue" }} />
            ) : (
              <PictureAsPdfIcon style={{ color: "red" }} />
            )}
            <span>{file.name}</span>
            <CloseIcon onClick={removeFile} style={{ cursor: "pointer", color: "gray" }} />
          </div>
        ) : (
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Arrastra un archivo aquí, o haz clic para seleccionar uno</p>
          </div>
        )}
      </div>
    );
  };