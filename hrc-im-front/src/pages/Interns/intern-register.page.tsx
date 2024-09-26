import { Navbar } from "../../components/navbars/navbar.component";
import { Breadcrumb } from "../../components/utils/breadcrumb.component";
import { SetStateAction, useState } from "react";
import "./interns.page.css";
import { RegisterRow } from "../../components/inputs/register-row.component";
import { ButtonComponent } from "../../components/buttons/buttons.component";
import { TestEnvio } from "../../api/api-request";
import { Footer } from "../../components/navbars/footer.component";

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

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value); // `e.target.value` es de tipo `string`
    setInternType(e.target.value);   // Si `setInternType` espera un `string`, esto funcionará bien
  };
  

  const RegisterNewIntern = () => {
    TestEnvio({
      name: InternName,
      email: InternEmail,
      type: InternType,
      university: InternUniversity,
      program: InternProgram,
      universityId: InternID,
      universityphone: InternInstitutePhone,
      oldDepartment: InternOldDepartment,
      phone: InternPhone,
      supervisor: InternSupervisor,
      department: InternDepartment,
      beginDate: InterBeginDate,
      endDate: InternEndDate,
      checkin: InternCheckIn,
      checkout: InternCheckOut,
      totalTime: InternTotalTime,
    })
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
                  />

                  <RegisterRow
                    label="Correo:"
                    onChange={(value) => setInternEmail(value || "")}
                    id="email"
                    type="text"
                    show={true}
                  />
                  <div className="info-row">
                    <label htmlFor="type">Tipo:</label>
                    <select
                      id="type"
                      className="edit-mode"
                      value={selectedType}
                      onChange={handleTypeChange}
                    >
                      <option value="Interno">Interno</option>
                      <option value="Externo">Externo</option>
                    </select>
                  </div>
                  <RegisterRow
                    label="Institución de procedencia:"
                    onChange={(value) => setInternUniversity(value || "")}
                    id="institution"
                    type="autocomplete"
                    coincidences={Universidades}
                    show={selectedType === "Externo"}
                  />
                  <RegisterRow
                    label="Carrera:"
                    onChange={(value) => setInternProgram(value || "")}
                    id="career"
                    type="autocomplete"
                    coincidences={["Ingeniería en Software", "Ingeniería Civil", "Ingeniería Industrial"]}
                    show={selectedType === "Externo"}
                  />
                  <RegisterRow
                    label="Matrícula escolar:"
                    onChange={(value) => setInternID(value || "")}
                    id="matricula"
                    type="number"
                    show={selectedType === "Externo"}
                  />
                  <RegisterRow
                    label="Tel Institucional:"
                    onChange={(value) => setInternInstitutePhone(value || "")}
                    type="number"
                    id="telInstitutional"
                    show={selectedType === "Externo"}
                  />
                  <RegisterRow
                    label="Tel Personal:"
                    onChange={(value) => setInternPhone(value || "")}
                    id="telPersonal"
                    type="number"
                    show={true}
                  />

                  <RegisterRow
                    label="Encargado:"
                    onChange={(value) => setInternSupervisor(value || "")}
                    id="encargado"
                    type="text"
                    show={true}
                  />
                  <RegisterRow
                    label="Departamento de procedencia:"
                    onChange={(value) => setInternDepartment(value || "")}
                    id="department"
                    type="text"
                    show={selectedType === "Interno"}
                  />
                  <RegisterRow
                    label="Departamento de practicas:"
                    onChange={(value) => setInternOldDepartment(value || "")}
                    id="department"
                    type="text"
                    show={true}
                  />

                </section>

                <section className="register-section-right">
                  <RegisterRow
                    label="Fecha de inicio:"
                    onChange={(value) => setInternBeginDate(value || "")}
                    id="startDate"
                    type="date"
                    show={true}
                  />
                  <RegisterRow
                    label="Fecha de fin:"
                    onChange={(value) => setInternEndDate(value || "")}
                    id="endDate"
                    type="date"
                    show={true}
                  />
                  <RegisterRow
                    label="Hora entrada:"
                    onChange={(value) => setInternCheckIn(value || "")}
                    id="horaEntrada"
                    type="time"
                    show={true}
                  />
                  <RegisterRow
                    label="Hora salida:"
                    onChange={(value) => setInternCheckOut(value || "")}
                    id="horaSalida"
                    type="time"
                    show={true}
                  />
                  <RegisterRow
                    label="Total de tiempo a cubrir:"
                    onChange={(value) => setInternTotalTime(value || "")}
                    id="tiempoTotal"
                    type="number"
                    show={true}
                  />
                </section>
              </div>
            </div>

            <div className="button-container-intern">
              <ButtonComponent
                text="Guardar"
                onClick={() => {
                  RegisterNewIntern();
                }}
              />
              <ButtonComponent
                text="Cancelar"
                onClick={() => {
                }}
              />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default InternRegisterPage;
