import { Navbar } from "../../components/navbars/navbar.component";
import { Breadcrumb } from "../../components/utils/breadcrumb.component";
import {useState } from "react";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import "./interns.page.css";
import { RegisterRow } from "../../components/inputs/register-row.component";
import ContactPhoneRoundedIcon from "@mui/icons-material/ContactPhoneRounded";
import { ButtonComponent } from "../../components/buttons/buttons.component";
import { Footer } from "../../components/navbars/footer.component";
import { careers } from "../../components/interns/interns-careers-table/interns-careers-table.component";
import { FormModal } from "../../components/modals/form-modal.component";
import { EmergencyContactsRegister } from "../../components/interns/interns-components/emergency-contacts-register.component";
import { InputValidators } from "../../functions/input-validators.functions";
import { set } from "date-fns";

const InternRegisterPage = () => {
  const [selectedType, setSelectedType] = useState("Interno");

  const [InternName, setInternName] = useState("");
  const [InternEmail, setInternEmail] = useState("");
  const [InternType, setInternType] = useState("Interno");

  const [InternUniversity, setInternUniversity] = useState("");
  const [InternProgram, setInternProgram] = useState("");
  const [InternID, setInternID] = useState("");
  const [InternInstitutePhone, setInternInstitutePhone] = useState("");

  const [InternPhone, setInternPhone] = useState("");
  const [InternSupervisor, setInternSupervisor] = useState("");
  const [InternDepartment, setInternDepartment] = useState("");

  const [InternOldDepartment, setInternOldDepartment] = useState("");

  const [InterBeginDate, setInternBeginDate] = useState("");
  const [InternEndDate, setInternEndDate] = useState("");
  const [InternCheckIn, setInternCheckIn] = useState("");
  const [InternCheckOut, setInternCheckOut] = useState("");
  const [InternTotalTime, setInternTotalTime] = useState("");

  const [InternAddress, setInternAddress] = useState("");

  const [InternEmergencyPhone, setInternEmergencyPhone] = useState("");


  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({
    internName: undefined,
    internEmail: undefined,
    internPhone: undefined,
    internAddress: undefined,
    internDepartment : undefined,
    internSupervisor: undefined,
    internOldDepartment: undefined,
    internUniversity: undefined,
    internProgram: undefined,
    internID: undefined,
    internInstitutePhone: undefined,
    internBeginDate: undefined,
    internEndDate: undefined,
    internCheckIn: undefined,
    internCheckOut: undefined,
    internTotalTime: undefined,
  });

  const [open, setOpen] = useState(false);
  const [entity, setEntity] = useState<string>("");
  const ModalOpen = () => setOpen(true);
  const ModalClose = () => setOpen(false);



  const TypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
    setInternType(e.target.value);
  };


  const ValidateInputs = () => {
    const validators = InputValidators();
    const newErrors: { [key: string]: string | undefined } = {};

    const resultName = validators.string(InternName);
    if (resultName) {
      newErrors.internName = resultName;
    }

    const resultEmail = validators.email(InternEmail);
    if (resultEmail) {
      newErrors.internEmail = resultEmail;
    }

    const resultPhone = validators.phone(InternPhone);
    if (resultPhone) {
      newErrors.internPhone = resultPhone;
    }

    const resultAddress = validators.string(InternAddress);
    if (resultAddress) {
      newErrors.internAddress = resultAddress;
    }

    const resultDepartment = validators.string(InternDepartment);
    if (resultDepartment) {
      newErrors.internDepartment = resultDepartment;
    }

    const resutSupervisor = validators.string(InternSupervisor);
    if (resutSupervisor) {
      newErrors.internSupervisor = resutSupervisor;
    }

    if(InternType === "Interno"){
      const resultOldDepartment = validators.string(InternOldDepartment);
      if (resultOldDepartment) {
        newErrors.internOldDepartment = resultOldDepartment;
      }
    }

    if(InternType === "Externo"){
      const resultUniversity = validators.string(InternUniversity);
      if (resultUniversity) {
        newErrors.internUniversity = resultUniversity;
      }

      const resultProgram = validators.number(InternProgram);
      if (resultProgram) {
        newErrors.internProgram = resultProgram;
      }

      const resultID = validators.string(InternID);
      if (resultID) {
        newErrors.internID = resultID;
      }

      const resultInstitutePhone = validators.phone(InternInstitutePhone);
      if (resultInstitutePhone) {
        newErrors.internInstitutePhone = resultInstitutePhone;
      }
    }

    const resultBeginDate = validators.date(InterBeginDate);
    if (resultBeginDate) {
      newErrors.internBeginDate = resultBeginDate;
    }

    const resultEndDate = validators.date(InternEndDate);
    if (resultEndDate) {
      newErrors.internEndDate = resultEndDate;
    }

    const resultCheckIn = validators.time(InternCheckIn);
    if (resultCheckIn) {
      newErrors.internCheckIn = resultCheckIn;
    }

    const resultCheckOut = validators.time(InternCheckOut);
    if (resultCheckOut) {
      newErrors.internCheckOut = resultCheckOut;
    }

    const resultTotalTime = validators.string(InternTotalTime);
    if (resultTotalTime) {
      newErrors.internTotalTime = resultTotalTime;
    }
    setErrors(newErrors); 
  };







  const Universidades = [
    "Universidad Politecnica de Quintana Roo",
    "Universidad del Caribe",
    "Universidad Nacional",
    "Universidad Tecnologica de la Mixteca",
    "Instituto de Investigaciones Fundamental",
    "Instituto Politecnico Nacional",
    "Universidad de Guadalajara",
    "Universidad de San Martin de Porres",
    "Universidad Politecnica de Guadalajara",
    "Universidad de Guanajuato",
    "Universidad Tecnologica de la Costa",
    "Universidad de San Juan de los Llanos",
    "Universidad Autonoma de Zacatecas",
    "Universidad Politecnica de Hidalgo",
    "Universidad de Guzman",
    "Universidad Politecnica de Pachuca",
    "Universidad de Tijuana",
    "Universidad Politecnica de Chihuahua",
    "Universidad Politecnica de Guanajuato",
    "Universidad Politecnica de San Luis Potosi",
  ];

  return (
    <div className="body-page">
      <Navbar />
      <div className="container-interns">
        <section className="interns-left-container"></section>
        <section className="interns-register-right-container">
          <Breadcrumb />
        </section>
      </div>
      <div className="interns-register">
        <section className="interns-register-body">
          <div className="nav-space"></div>

          <div>
            <div className="register-section-interns">
              <div className="register-container">
                <section className="register-section-left">
                  <RegisterRow
                    label="Nombre del practicante:"
                    onChange={(value) => setInternName(value || "")}
                    id="nombre"
                    type="text"
                    show={true}
                    validate={errors.internName ? "Error" : "Normal"}
                    typeError={errors.internName}
                  />

                  <RegisterRow
                    label="Correo:"
                    onChange={(value) => setInternEmail(value || "")}
                    id="email"
                    type="text"
                    show={true}
                    validate={errors.internEmail ? "Error" : "Normal"}
                    typeError={errors.internEmail}
                    
                  />
                  <RegisterRow
                    label="Tel Personal:"
                    onChange={(value) => setInternPhone(value || "")}
                    id="telPersonal"
                    type="number"
                    show={true}
                    validate={errors.internPhone ? "Error" : "Normal"}
                    typeError={errors.internPhone}
                  />
                  <div className="info-row">
                    <label htmlFor="type">Tipo:</label>
                    <select
                      id="type"
                      className="edit-mode"
                      value={selectedType}
                      onChange={TypeChange}
                    >
                      <option value="Interno">Interno</option>
                      <option value="Externo">Externo</option>
                    </select>
                  </div>
                  <RegisterRow
                    label="Dirección:"
                    onChange={(value) => setInternAddress(value || "")}
                    id="address"
                    type="text"
                    show={true}
                    validate={errors.internAddress ? "Error" : "Normal"}
                    typeError={errors.internAddress}
                  />
                  <RegisterRow
                    label="Departamento de practicas:"
                    onChange={(value) => setInternOldDepartment(value || "")}
                    id="department"
                    type="select"
                    show={true}
                    validate={errors.internDepartment ? "Error" : "Normal"}
                    typeError={errors.internDepartment}
                  />
                  <RegisterRow
                    label="Encargado:"
                    onChange={(value) => setInternSupervisor(value || "")}
                    id="encargado"
                    type="select"
                    show={true}
                    validate={errors.internSupervisor ? "Error" : "Normal"}
                    typeError={errors.internSupervisor}
                  />

                  {selectedType === "Externo" && (
                    <div className="register-intern-divider">
                      <SchoolRoundedIcon />{" "}
                      <h3>Información de la institución</h3>
                    </div>
                  )}
                     {selectedType === "Externo" && (
                  <p className="register-intern-suggestion" onClick={() => {setEntity("interns-institutions"); ModalOpen()}}>¿No encuetra una institución? Registrar una institución</p>
                )}
                  <RegisterRow
                    label="Institución de procedencia:"
                    onChange={(value) => setInternUniversity(value || "")}
                    id="institution"
                    type="autocomplete"
                    coincidences={Universidades}
                    show={selectedType === "Externo"}
                    validate={errors.internUniversity ? "Error" : "Normal"}
                    typeError={errors.internUniversity}
        
                  />
                  {selectedType === "Externo" && (
                     <p className="register-intern-suggestion" onClick={() => {setEntity("interns-careers"); ModalOpen()}}>¿No encuetra una carrera? Registrar una carrera</p>
                  )}
                 
                  <RegisterRow
                    label="Carrera:"
                    onChange={(value) => {
                      const selectedCareer = careers.find(
                        (career) => career.name === value
                      );
                      setInternProgram(
                        selectedCareer ? selectedCareer.id.toString() : ""
                      );
                    }}
                    id="career"
                    type="autocomplete"
                    coincidences={careers.map((career) => career.name)}
                    show={selectedType === "Externo"}
                    validate={errors.internProgram ? "Error" : "Normal"}
                    typeError={errors.internProgram}
                  />

                  <RegisterRow
                    label="Matrícula escolar:"
                    onChange={(value) => setInternID(value || "")}
                    id="matricula"
                    type="number"
                    show={selectedType === "Externo"}
                    validate={errors.internID ? "Error" : "Normal"}
                    typeError={errors.internID}
                  />
                  <RegisterRow
                    label="Tel Institucional:"
                    onChange={(value) => setInternInstitutePhone(value || "")}
                    type="number"
                    id="telInstitutional"
                    show={selectedType === "Externo"}
                    validate={errors.internInstitutePhone ? "Error" : "Normal"}
                    typeError={errors.internInstitutePhone}
                  />

                  <RegisterRow
                    label="Departamento de procedencia:"
                    onChange={(value) => setInternDepartment(value || "")}
                    id="department"
                    type="text"
                    show={selectedType === "Interno"}
                    validate={errors.internOldDepartment ? "Error" : "Normal"}
                    typeError={errors.internOldDepartment}
                  />
                </section>

                <section className="register-section-right">
                  <RegisterRow
                    label="Fecha de inicio:"
                    onChange={(value) => setInternBeginDate(value || "")}
                    id="startDate"
                    type="date"
                    show={true}
                    validate={errors.internBeginDate ? "Error" : "Normal"}
                    typeError={errors.internBeginDate}
                  />
                  <RegisterRow
                    label="Fecha de fin:"
                    onChange={(value) => setInternEndDate(value || "")}
                    id="endDate"
                    type="date"
                    show={true}
                    validate={errors.internEndDate ? "Error" : "Normal"}
                    typeError={errors.internEndDate}
                  />
                  <RegisterRow
                    label="Hora entrada:"
                    onChange={(value) => setInternCheckIn(value || "")}
                    id="horaEntrada"
                    type="time"
                    show={true}
                    validate={errors.internCheckIn ? "Error" : "Normal"}
                    typeError={errors.internCheckIn}
                  />
                  <RegisterRow
                    label="Hora salida:"
                    onChange={(value) => setInternCheckOut(value || "")}
                    id="horaSalida"
                    type="time"
                    show={true}
                    validate={errors.internCheckOut ? "Error" : "Normal"}
                    typeError={errors.internCheckOut}
                  />
                  <RegisterRow
                    label="Total de tiempo a cubrir:"
                    onChange={(value) => setInternTotalTime(value || "")}
                    id="tiempoTotal"
                    type="number"
                    show={true}
                    validate={errors.internTotalTime ? "Error" : "Normal"}
                    typeError={errors.internTotalTime}
                  />
                  <div className="register-intern-divider">
                    <ContactPhoneRoundedIcon /> <h3>Contactos de emergencia</h3>
                  </div>

                  <EmergencyContactsRegister />


                



                </section>
              </div>
            </div>

            <div className="button-container-intern">
              <ButtonComponent
                text="Guardar"
                onClick={() => {
                  ValidateInputs();
                }}
              />
              <ButtonComponent text="Cancelar" onClick={() => history.back()} />
            </div>
          </div>
        </section>
      </div>
      <FormModal 
        open={open} 
        onConfirm={ModalClose} 
        onCancel={ModalClose} 
        title="Agregar" 
        type="Add" 
        entity={entity} 
        message={''} 
      />
      <Footer />
    </div>
  );
};

export default InternRegisterPage;
