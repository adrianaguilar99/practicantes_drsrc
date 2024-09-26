import { InfoRow } from "../../components/inputs/info-row.component";
import { Navbar } from "../../components/navbars/navbar.component";
import { Breadcrumb } from "../../components/utils/breadcrumb.component";
import { useState } from "react";
import MyAvatar from "../../assets/images/avatar-test.jpg";
import { ButtonComponent, EditButton } from "../../components/buttons/buttons.component";
import { CommentsTable } from "../../components/interns/interns-components/comments-table.component";
import { ConfirmationModal } from "../../components/modals/confirmation-modal.component";

const InternInformationPage = () => {
  const [editable, setEditable] = useState(false);
  const [saveEdit, setSaveEdit] = useState(false); 
  const [progreso, setProgreso] = useState(45);
  const [showModal, setShowModal] = useState(false);  
  const [InternType, setInternType] = useState("Externo");


  const [InternName, setInternName] = useState("");
  const [InternEmail, setInternEmail] = useState("");
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


  const EditPage = () => {
    if (editable) {
      setSaveEdit(true);
    } else {
      setEditable(true); 
      setSaveEdit(false);
    }
  };

  const handleConfirmSave = () => {
    setEditable(false);  
    setSaveEdit(false);
    setShowModal(false);
  };


  const handleCancelSave = () => {
    setSaveEdit(false); 
    setShowModal(false); 
  };

  return (
    <div className="body-page">
      <Navbar />
      <div className="container-interns">
        <section className="interns-left-container"></section>
        <section className="interns-information-right-container">
          <Breadcrumb />
        </section>
      </div>
      <div className="interns-information">
        <section className="interns-information-header">
          <div className="interns-information-title-type">
            <h2>PRACTICANTE {InternType.toUpperCase()}</h2>
          </div>
          <div className="interns-information-title-name">
            <h1>INFORMACION DEL PRACTICANTE</h1>
          </div>
        </section>
        <section className="interns-information-body">
          <div className="nav-space"></div>
          <div className="info-section-interns">
            <div className="info-container">
              <section className="info-section-left">
                <h3>LEONARDO DANIEL REBOLLO CALERO</h3>
                <InfoRow
                  label="Institución de procedencia:"
                  value="UNIVERSIDAD POLITÉCNICA DE QUINTANA ROO"
                  id="institution"
                  editable={editable}
                  show={InternType === "Externo"}
                  onChange={(value) => setInternUniversity(value || "")}
                />
                <InfoRow
                  label="Carrera:"
                  value="INGENIERÍA EN SOFTWARE"
                  id="career"
                  type="text"
                  editable={editable}
                  show={InternType === "Externo"}
                  onChange={(value) => setInternProgram(value || "")}
                />
                <InfoRow
                  label="Matrícula escolar:"
                  value="202100167"
                  id="matricula"
                  type="text"
                  editable={editable}
                  show={InternType === "Externo"}
                  onChange={(value) => setInternID(value || "")}
                />
                <InfoRow
                  label="Tel Institucional:"
                  value="998 476 8123"
                  type="text"
                  id="telInstitutional"
                  editable={editable}
                  show={InternType === "Externo"}
                  onChange={(value) => setInternInstitutePhone(value || "")}
                />
                <InfoRow
                  label="Tel Personal:"
                  value="998 476 8156"
                  id="telPersonal"
                  type="text"
                  editable={editable}
                  show={InternType === "Externo" || InternType === "Interno"}
                  onChange={(value) => setInternPhone(value || "")}
                />
                <InfoRow
                  label="Correo:"
                  value="leonardod.rebollo@gmail.com"
                  id="email"
                  type="text"
                  editable={editable}
                  show={InternType === "Externo" || InternType === "Interno"}
                  onChange={(value) => setInternEmail(value || "")}
                />
                <InfoRow
                  label="Encargado:"
                  value="BRIAN WILFRIDO ROMERO CUPUL"
                  id="encargado"
                  type="text"
                  editable={editable}
                  show={InternType === "Externo" || InternType === "Interno"}
                  onChange={(value) => setInternSupervisor(value || "")}
                />
                <InfoRow
                  label="Departamento de procedencia:"
                  value="Tecnologías de la Información"
                  id="department"
                  type="text"
                  editable={editable}
                  show={InternType === "Interno"}
                  onChange={(value) => setInternOldDepartment(value || "")}
                />
                <InfoRow
                  label="Departamento:"
                  value="Tecnologías de la Información"
                  id="department"
                  type="text"
                  editable={editable}
                  show={InternType === "Externo" || InternType === "Interno"}
                  onChange={(value) => setInternOldDepartment(value || "")}
                />
              </section>

              <section className="info-section-right">
                <div className="info-section-right-options">
                  <img src={MyAvatar} />
                  <div className="info-section-right-options-buttons">
                    <EditButton onClick={EditPage} editing={editable}/>
                  
                    <ConfirmationModal
                      open={saveEdit}
                      onConfirm={handleConfirmSave}  
                      onCancel={handleCancelSave}  
                      title="Confirmación de guardado"
                      message="¿Estás seguro que deseas guardar los cambios?"
                    />
                    <ButtonComponent
                      text="Generar Tarjeta del practicante"
                      onClick={function (): void {
                        throw new Error("Function not implemented.");
                      }}
                    />
                    
                  </div>
                </div>
                <InfoRow
                  label="Fecha de inicio:"
                  value="01-01-2022"
                  id="startDate"
                  type="date"
                  editable={editable}
                  show={InternType === "Externo" || InternType === "Interno"}
                  onChange={(value) => setInternBeginDate(value || "")}
                />
                <InfoRow
                  label="Fecha de fin:"
                  value="01-01-2022"
                  id="startDate"
                  type="date"
                  editable={editable}
                  show={InternType === "Externo" || InternType === "Interno"}
                  onChange={(value) => setInternEndDate(value || "")}
                />
                <InfoRow
                  label="Hora entrada:"
                  value="09:00 a.m."
                  id="startDate"
                  type="date"
                  editable={editable}
                  show={InternType === "Externo" || InternType === "Interno"}
                  onChange={(value) => setInternCheckIn(value || "")}
                />
                <InfoRow
                  label="Hora salida:"
                  value="17:00 p.m."
                  id="startDate"
                  type="date"
                  editable={editable}
                  show={InternType === "Externo" || InternType === "Interno"}
                  onChange={(value) => setInternCheckOut(value || "")}
                />
                <InfoRow
                  label="Total de tiempo a cubrir:"
                  value="600 horas"
                  id="startDate"
                  type="date"
                  editable={editable}
                  show={InternType === "Externo" || InternType === "Interno"}
                  onChange={(value) => setInternTotalTime(value || "")} />
                <InfoRow
                  label="Tiempo cubierto:"
                  value="254 horas"
                  id="startDate"
                  type="date"
                  show={InternType === "Externo" || InternType === "Interno"}
                  editable={false} 
                              
                />
              </section>
              <div className="intern-progress-space-container">
              <div className="intern-progress-space">
                <p>Progreso del practicante</p>
                <div className="progress-section">
                  <span>
                    {progreso === 100 ? "¡Completado!" : `${progreso}%`}
                  </span>
                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{ width: `${progreso}%` }}
                    ></div>
                  </div>
                </div>
                
              </div>
              <div className="intern-progress-space-buttons">
              <ButtonComponent
                      text="Generar reporte semanal"
                      onClick={function (): void {
                        throw new Error("Function not implemented.");
                      }}
                    />
                    <ButtonComponent
                      text="Generar reporte mensual"
                      onClick={function (): void {
                        throw new Error("Function not implemented.");
                      }}
                    />
              </div>
            
              </div>
           
            </div>
            <div className="comments-container">
              <CommentsTable />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default InternInformationPage;
