import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import AddIcCallRoundedIcon from "@mui/icons-material/AddIcCallRounded";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { useState } from "react";
export const EmergencyContactsRegister = () => {
    const [contacts, setContacts] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>("");
    const handleAddContact = () => {
        if (inputValue) {
          setContacts([...contacts, inputValue]);
          setInputValue(""); // Limpiar el input después de añadir
        }
      };
    
      // Eliminar un campo de contacto específico
      const handleRemoveContact = (index: number) => {
        setContacts(contacts.filter((_, i) => i !== index));
      };
    
      // Actualizar el valor de un número de contacto
      const handleContactChange = (value: string, index: number) => {
        const updatedContacts = [...contacts];
        updatedContacts[index] = value;
        setContacts(updatedContacts);
      };
    return (
        <div className="register-intern-contact-container">
        <section className="register-intern-contact-form">
          <div className="register-intern-contact-form-input">
            <label htmlFor="name">Número de emergencia: </label>
            <input
              className="register-intern-contact-input"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <button
            className="add-contact-button"
            onClick={handleAddContact}
            disabled={contacts.length >= 4}
          >
            <AddIcCallRoundedIcon /> Añadir
          </button>
        </section>
  
        <div className="register-intern-contact-list">
          <TransitionGroup>
            {contacts.map((contact, index) => (
              <CSSTransition
                key={index}
                timeout={500}
                classNames="contact"
              >
                <div className="register-intern-contact-add">
                  <div className="register-intern-contact-tel">
                    <AccountCircleRoundedIcon sx={{ marginLeft: 5 }} />
                    <p>{contact}</p>
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
  }