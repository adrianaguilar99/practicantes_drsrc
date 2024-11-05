import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useState } from "react";
import { RegisterRow } from "../../inputs/register-row.component";
import { InputValidators } from "../../../functions/input-validators.functions";
import { ButtonComponent, EditButton } from "../../buttons/buttons.component";
import { on } from "events";
import { deleteEmergencyContact, patchEmergencyContact, postEmergencyContact } from "../../../api/interns/emergency-contacts/emergency-contacts.api";
import { enqueueSnackbar } from "notistack";

interface InternEmergenciesModalProps {
  data: any[];
  internId: string;
  open: boolean;
  ModalClose: () => void;
  onUpdate: () => void;
}

export const InternEmergenciesModal: React.FC<InternEmergenciesModalProps> = ({
  data,
  internId,
  open,
  onUpdate,
  ModalClose,
}) => {
  const [mode, setMode] = useState("normal");
  const [isEdit, setIsEdit] = useState(false);
  const [contactName, setContactName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [phone, setPhone] = useState("");
  const [positionContact, setPositionContact] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<Partial<{
    contactName: string;
    relationship: string;
    phone: string;
    positionContact: string;
  }>>({ contactName: undefined, relationship: undefined, phone: undefined, positionContact: undefined });

  
  const validateAndSubmit = () => {
    const userToken = sessionStorage.getItem("_Token") || "";
    const validators = InputValidators();
    const newErrors = {
      contactName: validators.string(contactName),
      relationship: validators.string(relationship),
      phone: validators.phone(phone),
      positionContact: validators.string(positionContact),
    };
    setErrors(newErrors);

    if (!newErrors.contactName && !newErrors.relationship && !newErrors.phone && !newErrors.positionContact) {
      if (mode === "edit" && editIndex !== null) {
        patchEmergencyContact(userToken, data[editIndex].id, {
          name: contactName,
          phone: phone,
          relationship: relationship,
          positionContact: positionContact || "",
        }).then(() => {
          onUpdate();
          enqueueSnackbar("Contacto de emergencia editado correctamente: ",{
            variant: "success",
          })
        }).catch((error)=>
          enqueueSnackbar("Error al editar los contactos de emergencia: " + error, {
            variant: "error",
          })       
        );
      } else if (mode === "add") {
        postEmergencyContact(userToken, 
          {name: contactName, phone: phone, relationship: relationship, positionContact: positionContact || "" , internId: internId})
          .then(()=>
            {onUpdate();
            enqueueSnackbar("Contacto de emergencia agregado correctamente: ",{
              variant: "success",
            })
          }
          ).catch((error)=>
            enqueueSnackbar("Error al agregar los contactos de emergencia: " + error, {
              variant: "error",
            })       
          );
      }
      resetForm();
      
      setMode("normal");
      onUpdate();
    }
  };

  const resetForm = () => {
    setContactName("");
    setRelationship("");
    setPhone("");
    setPositionContact("");
    setEditIndex(null);
    setErrors({});
  };

  const startEditContact = (index: number) => {
    resetForm();
    const contact = data[index];
    setContactName(contact.name);
    setRelationship(contact.relationship);
    setPhone(contact.phone);
    setPositionContact(contact.positionContact);
    setEditIndex(index);
    setMode("edit");
   
  };

  const ChangeEdit = () => {
    setIsEdit(!isEdit);
  }

  const RemoveContact = (index: number) => {
    const userToken = sessionStorage.getItem("_Token") || "";
    if(data.length < 3){
      enqueueSnackbar("No se puede tener menos de 2 contactos de emergencia ",{
        variant: "error",
      })
    }
    else{
      deleteEmergencyContact(userToken, data[index].id).then(() => {
        onUpdate();
              enqueueSnackbar("Contacto de emergencia eliminado correctamente: ",{
                variant: "success",
              })
      }).catch((error)=>
        enqueueSnackbar("Error al eliminar los contactos de emergencia: " + error, {
          variant: "error",
        })       
      );
      
    }

  };

  return (
    <Dialog
      open={open}
      onClose={ModalClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiDialog-paper": {
          width: "100%",
          maxWidth: mode === "normal" ? "500px" : "800px",
          fontFamily: "Lato",
          fontSize: ".75rem",
        },
      }}
    >
       <DialogTitle
        sx={{
          bgcolor: "#EDEDED", 
          color: "#2E3B4E",      
          padding: 2,
          textAlign: "start",
          fontSize: ".9rem",
          height: 5,
          lineHeight: 1,
        }}
    >
      {"Contactos de Emergencia"}
    </DialogTitle>
      <DialogContent sx={{
      backgroundColor: "#EDEDED",
    }
    }>
        <DialogContentText sx={{ marginTop: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <div style={mode === "normal" ? { width: "100%" } : { width: "50%" }}> 
              {data.map((emergency, index) => (
                <div key={emergency.id} className="register-intern-contact-add" style={{ display: "flex", alignItems: "center" }}>
                  <AccountCircleRoundedIcon />
                  <p>
                    {emergency.name} ({emergency.relationship}) - {emergency.phone}
                  </p>
                  <div style={{ display: "flex", gap: "8px", marginLeft: "auto" }}>
                    <button hidden={mode !== "edit"} onClick={() => startEditContact(index)}>
                      <EditOutlinedIcon />
                    </button>
                    <button hidden={mode !== "edit"} onClick={() => RemoveContact(index)}>
                      <RemoveRoundedIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Mostrar inputs solo en modos add o edit */}
            <div hidden={mode === "normal"} style={{ width: "50%" }}>
              <RegisterRow
                label="Nombre:"
                onChange={(value) => setContactName(value as string || "")}
                validate={errors.contactName ? "Error" : "Normal"}
                typeError={errors.contactName}
                value={contactName}
                id={"name"}
                type="text"
                show={true}
              />
              <RegisterRow
                label="Parentesco:"
                onChange={(value) => setRelationship(value as string || "")}
                validate={errors.relationship ? "Error" : "Normal"}
                typeError={errors.relationship}
                value={relationship}
                id={"parent"}
                type="text"
                show={true}
              />
              <RegisterRow
                label="Número:"
                onChange={(value) => setPhone(value as string || "")}
                validate={errors.phone ? "Error" : "Normal"}
                typeError={errors.phone}
                value={phone}
                type="phone"
                id={"number"}
                maxLength={10}
                show={true}
              />
              <RegisterRow
                label="Cargo laboral:"
                onChange={(value) => setPositionContact(value as string || "")}
                validate={errors.positionContact ? "Error" : "Normal"}
                typeError={errors.positionContact}
                value={positionContact}
                type="text"
                id={"position"}
                show={true}
              />
                  <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "30px",
              }}
            >
               <Button
                variant="contained"
                color="primary"
                onClick={validateAndSubmit}>
                {mode === "add" ? "Añadir" : "Guardar"}
              </Button>
  
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  bgcolor: "#D32F2F",
                  "&:hover": { bgcolor: "#8b4513" },
                }}
                onClick={() => setMode("normal")}
              >
                Cancelar
              </Button>
              </Box>
            </div>
          </Box>
          {mode === "normal" && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "30px",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => {resetForm();setMode("add")}} hidden={mode !== "normal"}
              >
                Añadir
              </Button>
  
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  bgcolor: "#B88A54",
                  "&:hover": { bgcolor: "#B98A54" },
                }}
                onClick={() => {resetForm();setMode("edit")}} hidden={mode !== "normal"}
              >
                Editar
              </Button>
            </Box>
          )}
          
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
