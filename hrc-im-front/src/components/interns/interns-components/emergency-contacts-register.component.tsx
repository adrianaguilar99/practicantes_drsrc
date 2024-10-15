import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import AddIcCallRoundedIcon from "@mui/icons-material/AddIcCallRounded";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { useState } from "react";
import { RegisterRow } from "../../inputs/register-row.component";
import { InputValidators } from "../../../functions/input-validators.functions";

export const EmergencyContactsRegister = () => {
  const [contacts, setContacts] = useState<{ name: string; relationship: string; phone: string }[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const [ContactName, setContactName] = useState<string>("");
  const [Relationship, setRelationship] = useState<string>("");

  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({
    contactName: undefined,
    contactRelationship: undefined,
    contactPhone: undefined,
  });

  const AddContact = () => {
    ValidateInputs();
  };

  // Eliminar un contacto específico
  const handleRemoveContact = (index: number) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  const ValidateInputs = () => {
    const validators = InputValidators();
    const newErrors: { [key: string]: string | undefined } = {};

    const resultName = validators.string(ContactName);
    if (resultName) {
      newErrors.contactName = resultName;
    }

    const resultRelationship = validators.string(Relationship);
    if (resultRelationship) {
      newErrors.contactRelationship = resultRelationship;
    }

    const resultPhone = validators.phone(inputValue);
    if (resultPhone) {
      newErrors.contactPhone = resultPhone;
    }

    setErrors(newErrors);

    if (!newErrors.contactName && !newErrors.contactRelationship && !newErrors.contactPhone) {
      setContacts([...contacts, { name: ContactName, relationship: Relationship, phone: inputValue }]);
      setInputValue("");
      setContactName("");
      setRelationship("");
    }
  };

  return (
    <div className="register-intern-contact-container">
      <section className="register-intern-contact-form">
        <div className="register-intern-contact-form-input">
          <div className="register-intern-contact-form-input-row">
            <RegisterRow
              label="Nombre:"
              onChange={(value) => setContactName(value || "")}
              id="name"
              type="text"
              show={true}
              validate={errors.contactName ? "Error" : "Normal"}
              typeError={errors.contactName}
            />
            <RegisterRow
              label="Parentesco:"
              onChange={(value) => setRelationship(value || "")}
              id="relationship"
              type="text"
              show={true}
              validate={errors.contactRelationship ? "Error" : "Normal"}
              typeError={errors.contactRelationship}
            />
          </div>
      
          <RegisterRow
            label="Numero:"
            onChange={(value) => setInputValue(value || "")}
            id="phone"
            value={inputValue}
            type="number"
            show={true}
            validate={errors.contactPhone ? "Error" : "Normal"}
            typeError={errors.contactPhone}
          />
        </div>
        <button
          className="add-contact-button"
          onClick={AddContact}
          disabled={contacts.length >= 4}
        >
          <AddIcCallRoundedIcon /> Añadir
        </button>
      </section>

      <div className="register-intern-contact-list">
        <TransitionGroup>
          {contacts.map((contact, index) => (
            <CSSTransition key={index} timeout={500} classNames="contact">
              <div className="register-intern-contact-add">
                <div className="register-intern-contact-tel">
                  <AccountCircleRoundedIcon sx={{ marginLeft: 5 }} />
                  <p>{contact.name} ({contact.relationship}) - {contact.phone}</p>
                </div>
                <div>
                  <button
                    className="delete-contact-button"
                    onClick={() => handleRemoveContact(index)}
                  >
                    <RemoveRoundedIcon />
                  </button>
                </div>
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  );
};
