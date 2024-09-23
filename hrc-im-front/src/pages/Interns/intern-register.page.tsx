import { Navbar } from "../../components/navbars/navbar.component";
import { Breadcrumb } from "../../components/utils/breadcrumb.component";
import { SetStateAction, useState } from "react";
import "./interns.page.css";
import { RegisterRow } from "../../components/interns/interns-components/register-row.component";
import { ButtonComponent } from "../../components/buttons/buttons.component";

const InternRegisterPage = () => {
  // Estado para almacenar el tipo seleccionado
  const [selectedType, setSelectedType] = useState("Interno");

  // Función para manejar el cambio en el selector
  const handleTypeChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedType(e.target.value);
  };

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
        <section className="interns-register-header">
          <div className="interns-register-title-name">
            <h1>Registrar información del practicante</h1>
          </div>
        </section>
        <section className="interns-register-body">
          <div className="nav-space"></div>

          <div>
            <div className="register-section-interns">
              <div className="register-container">
                <section className="register-section-left">
                  <RegisterRow
                    label="Nombre del practicante:"
                    value="LEONARDO DAVID REBOLLO CUPUL"
                    id="nombre"
                    type="text"
                    show={true} 
                  />
                      <RegisterRow
                    label="Correo:"
                    value="leonardod.rebollo@gmail.com"
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
                    value="UNIVERSIDAD POLITÉCNICA DE QUINTANA ROO"
                    id="institution"
                    type="autocomplete"
                    coincidences={["Universidad Política de Quintana Roo", "Universidad del Caribe", "Instituto Político Nacional"]}
                    show={selectedType === "Externo"} 
                  />
                  <RegisterRow
                    label="Carrera:"
                    value="INGENIERÍA EN SOFTWARE"
                    id="career"
                    type="autocomplete"
                    coincidences={["Ingeniería en Software", "Ingeniería Civil", "Ingeniería Industrial"]}
                    show={selectedType === "Externo"} 
                  />
                  <RegisterRow
                    label="Matrícula escolar:"
                    value="202100167"
                    id="matricula"
                    type="number"
                    show={selectedType === "Externo"} 
                  />
                  <RegisterRow
                    label="Tel Institucional:"
                    value="998 476 8123"
                    type="number"
                    id="telInstitutional"
                    show={selectedType === "Externo"} 
                  />
                  <RegisterRow
                    label="Tel Personal:"
                    value="998 476 8156"
                    id="telPersonal"
                    type="number"
                    show={true} 
                  />
              
                  <RegisterRow
                    label="Encargado:"
                    value="BRIAN WILFRIDO ROMERO CUPUL"
                    id="encargado"
                    type="text"
                    show={true} 
                  />
                       <RegisterRow
                    label="Departamento de procedencia:"
                    value="Tecnologías de la Información"
                    id="department"
                    type="text"
                    show={selectedType === "Interno"}
                  />
                  <RegisterRow
                    label="Departamento de practicas:"
                    value="Tecnologías de la Información"
                    id="department"
                    type="text"
                    show={true}
                  />
              
                </section>

                <section className="register-section-right">
                  <RegisterRow
                    label="Fecha de inicio:"
                    value="01-01-2022"
                    id="startDate"
                    type="date"
                    show={true} 
                  />
                  <RegisterRow
                    label="Fecha de fin:"
                    value="01-01-2022"
                    id="endDate"
                    type="date"
                    show={true}
                  />
                  <RegisterRow
                    label="Hora entrada:"
                    value="09:00 a.m."
                    id="horaEntrada"
                    type="time"
                    show={true}
                  />
                  <RegisterRow
                    label="Hora salida:"
                    value="17:00 p.m."
                    id="horaSalida"
                    type="time"
                    show={true}
                  />
                  <RegisterRow
                    label="Total de tiempo a cubrir:"
                    value="600 horas"
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
    </div>
  );
};

export default InternRegisterPage;
