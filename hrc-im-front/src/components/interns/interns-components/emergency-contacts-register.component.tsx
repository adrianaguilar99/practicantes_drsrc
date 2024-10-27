import { useEffect, useState } from "react";
import { InputValidators } from "../../../functions/input-validators.functions";
import { RegisterRow } from "../../inputs/register-row.component";
import AddIcCallRoundedIcon from "@mui/icons-material/AddIcCallRounded";
import {
  DataEmergencyContact,
  EmergencyContactInterface,
} from "../../../interfaces/interns/emergency-contacts/emergency-contacts.interface";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { on } from "events";
import { ButtonComponent } from "../../buttons/buttons.component";

export const EmergencyContactsRegister = ({ triggerAction = false, onReceiveContacts = (contacts: DataEmergencyContact[]) => {} }) => {
  const [contacts, setContacts] = useState<DataEmergencyContact[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addContact = (contact: DataEmergencyContact) => {
    setContacts([...contacts, contact]);
  };

  const RemoveContact = (index: number) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (triggerAction) {
      console.log("Acción activada por el componente padre");
      onReceiveContacts(contacts); 
    }
  }, [triggerAction, contacts, onReceiveContacts]);

  return (
    <div className="register-intern-contact-container">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          className="add-contact-button"
          onClick={() => setIsModalOpen(true)}
          disabled={contacts.length >= 4}
        >
          <AddIcCallRoundedIcon /> Añadir
        </button>
      </div>

      {isModalOpen && (
        <EmergencyContactModal
          onAddContact={addContact}
          onClose={() => setIsModalOpen(false)}
          open={isModalOpen}
        />
      )}

      <div className="register-intern-contact-list">
        <TransitionGroup>
          {contacts.map((contact, index) => (
            <CSSTransition key={index} timeout={500} classNames="contact">
              <div key={index} className="register-intern-contact-add">
                <AccountCircleRoundedIcon />
                <p>
                  {contact.name} ({contact.relationship}) - {contact.phone}
                </p>
                <button onClick={() => RemoveContact(index)}>
                  <RemoveRoundedIcon />
                </button>
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  );
};

interface EmergencyContactModalProps {
  onAddContact: (contact: DataEmergencyContact) => void;
  onClose: () => void;
  open?: boolean;
}


export const EmergencyContactModal = ({
  onAddContact,
  onClose,
  open = false,
}: EmergencyContactModalProps) => {
  const [contactName, setContactName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [phone, setPhone] = useState("");
  const [positionContact, setPositionContact] = useState("");
  const [errors, setErrors] = useState<
    Partial<{ contactName: string; relationship: string; phone: string; positionContact: string  }>
  >({ contactName: undefined, relationship: undefined, phone: undefined, positionContact: undefined });

  const validateAndSubmit = () => {
    const validators = InputValidators();
    const newErrors = {
      contactName: validators.string(contactName),
      relationship: validators.string(relationship),
      phone: validators.phone(phone),
      positionContact: validators.string(positionContact),
    };
    setErrors(newErrors);

    if (!newErrors.contactName && !newErrors.relationship && !newErrors.phone && !newErrors.positionContact) {
      onAddContact({
        name: contactName,
        relationship,
        phone,
        positionContact: positionContact || "",
      });
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{"Agregar Contacto de Emergencia"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <RegisterRow
            label="Nombre:"
            onChange={(value) => setContactName(value || "")}
            validate={errors.contactName ? "Error" : "Normal"}
            typeError={errors.contactName }
            id={"name"}
            type="text"
            show={true}
          />
          <RegisterRow
            label="Parentesco:"
            onChange={(value) => setRelationship(value || "")}
            validate={errors.relationship ? "Error" : "Normal"}
            typeError={errors.relationship }
            id={"parent"}
            type="text"
            show={true}
          />
          <RegisterRow
            label="Número:"
            onChange={(value) => setPhone(value || "")}
            validate={errors.phone ? "Error" : "Normal"}
            typeError={errors.phone }
            value={phone}
            type="phone"
            id={"number"}
            maxLength={10}
            show={true}
          />
          <RegisterRow
            label="Cargo laboral:"
            onChange={(value) => setPositionContact(value || "")}
            validate={errors.positionContact ? "Error" : "Normal"}
            typeError={errors.positionContact }
            type="text"
            id={"number"}
            show={true}
          />
          <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "30px",
              }}
            >
              <div style={{ maxWidth: "80%" }}>
                <ButtonComponent text="Aceptar" onClick={validateAndSubmit} />
              </div>
  
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  bgcolor: "#A0522D",
                  "&:hover": { bgcolor: "#8b4513" },
                }}
                onClick={onClose}
              >
                Cancelar
              </Button>
            </Box>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
