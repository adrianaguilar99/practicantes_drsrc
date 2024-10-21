import { InfoRow } from "../../components/inputs/info-row.component";
import { Navbar } from "../../components/navbars/navbar.component";
import { Breadcrumb } from "../../components/utils/breadcrumb.component";
import { useEffect, useState } from "react";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import MyAvatar from "../../assets/images/avatar-test.jpg";
import {
  ButtonComponent,
  EditButton,
} from "../../components/buttons/buttons.component";
import { CommentsTable } from "../../components/interns/interns-components/comments-table.component";
import { ConfirmationModal } from "../../components/modals/confirmation-modal.component";
import { Footer } from "../../components/navbars/footer.component";
import { useNavigate } from "react-router-dom";
import { FormModal } from "../../components/modals/form-modal.component";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { InternSupervisorsModal } from "../../components/interns/interns-info-modals/intern-supervisors-modal";
import { InternEmergenciesModal } from "../../components/interns/interns-info-modals/intern-emergency-modal";
import { InternFilesModal } from "../../components/interns/interns-info-modals/intern-files-modal";

const InternInformationPage = () => {
  const [editable, setEditable] = useState(false);
  const [saveEdit, setSaveEdit] = useState(false);
  const [progreso, setProgreso] = useState(45);
  const [showModal, setShowModal] = useState(false);
  const [InternType, setInternType] = useState("Externo");
  const [ModalSupervisor, setModalSupervisor] = useState(false);
  const [ModalEmergency, setModalEmergency] = useState(false);
  const [ModalFiles, setModalFiles] = useState(false);

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

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const Open = () => setOpen(true);
  const Close = () => setOpen(false);

  const EditPage = () => {
    if (editable) {
      setSaveEdit(true);
    } else {
      setEditable(true);
      setSaveEdit(false);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("edit") === "true") {
      setEditable(true);
    }
  }, [location]);

  const ConfirmSave = () => {
    setEditable(false);
    setSaveEdit(false);
    setShowModal(false);
  };

  const CancelSave = () => {
    setSaveEdit(false);
    setShowModal(false);
  };

  const onConfirm = () => {
    setShowModal(true);
  };

  //MODALES
  const ClickOpenSupervisor = () => {
    setModalSupervisor(true);
  };
  const ClickCloseSupervisor = () => {
    setModalSupervisor(false);
  };

  const ClickOpenEmergency = () => {
    setModalEmergency(true);
  };
  const ClickCloseEmergency = () => {
    setModalEmergency(false);
  };

  const ClickOpenFiles = () => {
    setModalFiles(true);
  };
  const ClickCloseFiles = () => {
    setModalFiles(false);
  };

  const Click = () => {
    Open();
  };

  const Encargados = [
    {
      name: "YOSHUA RAYMUNDO MORENO ARREDONDO LOPEZ",
    },
    {
      name: "LEONARDO DANIEL REBOLLO CALERO",
    },
    {
      name: "ALEXANDER RODRIGUEZ RODRIGUEZ",
    },
  ];

  const Emergencias = [
    {
      name: "YOSHUA RAYMUNDO MORENO ARREDONDO LOPEZ",
      parentesco: "Padre",
      phone: "123456789",
    },
    {
      name: "LEONARDO DANIEL REBOLLO CALERO",
      parentesco: "Padre",
      phone: "123456789",
    },
    {
      name: "ALEXANDER RODRIGUEZ RODRIGUEZ",
      parentesco: "Padre",
      phone: "123456789",
    },
  ];

  const Files = [
    {
      name: "Copia de Credencial",
    },
    {
      name: "Copia de Credencial",
    },
    {
      name: "Copia de Credencial",
    },
    {
      name: "Copia de Credencial",
    },
  ];

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
          <div
            className={`interns-information-title-type  ${InternType === "Interno" ? "intern" : "extern"}`}
          >
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
                  label="Dirección:"
                  value="Blvd. Kukulcan Km 14, Zona Hotelera, 77500 Cancun, Quintana Roo · 15 km"
                  id="encargado"
                  type="textarea"
                  editable={editable}
                  show={InternType === "Externo" || InternType === "Interno"}
                  onChange={(value) => setInternSupervisor(value || "")}
                />
                <InfoRow
                  label="Tipo de sangre:"
                  value="O+"
                  id="encargado"
                  type="text"
                  editable={editable}
                  show={InternType === "Externo" || InternType === "Interno"}
                  onChange={(value) => setInternSupervisor(value || "")}
                />
                <InfoRow
                  label="Departamento de practicas:"
                  value="TECNOLOGIAS DE LA INFORMACION"
                  id="department"
                  type="text"
                  editable={editable}
                  show={InternType === "Externo" || InternType === "Interno"}
                  onChange={(value) => setInternOldDepartment(value || "")}
                />
                <InfoRow
                  label="Departamento de procedencia:"
                  value="SEGURIDAD"
                  id="department"
                  type="text"
                  editable={editable}
                  show={InternType === "Interno"}
                  onChange={(value) => setInternOldDepartment(value || "")}
                />
                <div className="info-section-left-options">
                  <div className="info-section-left-options-label">
                    <label>Encargados:</label>
                  </div>
                  <div className="info-section-left-options-encargados">
                    {Encargados.length > 1 ? (
                      <button onClick={ClickOpenSupervisor}>
                        {"( " + Encargados.length + " )"} Ver todos
                      </button>
                    ) : (
                      Encargados.length === 1 && <p>{Encargados[0].name}</p>
                    )}
                  </div>
                </div>

                <div className="info-section-left-options">
                  <div className="info-section-left-options-label">
                    <label>Contactos de emergencia:</label>
                  </div>
                  <div className="info-section-left-options-encargados">
                    {Emergencias.length > 1 ? (
                      <button onClick={ClickOpenEmergency}>
                        {"( " + Emergencias.length + " )"} Ver todos
                      </button>
                    ) : (
                      Emergencias.length === 1 && <p>{Emergencias[0].name}</p>
                    )}
                  </div>
                </div>

                <div className="info-section-left-options">
                  <div className="info-section-left-options-label">
                    <label>Archivos del practicante:</label>
                  </div>
                  <div className="info-section-left-options-encargados">
                    {Files.length > 1 ? (
                      <button onClick={ClickOpenFiles}>
                        {"( " + Files.length + " )"} Ver todos
                      </button>
                    ) : (
                      Files.length === 1 && <p>{Files[0].name}</p>
                    )}
                  </div>
                </div>

                {InternType === "Externo" && (
                  <div className="register-intern-divider">
                    <SchoolRoundedIcon /> <h3>Información de la institución</h3>
                  </div>
                )}

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
                  label="Tel Internacional:"
                  value="9983847681"
                  id="matricula"
                  type="text"
                  editable={false}
                  show={InternType === "Externo"}
                  onChange={(value) => setInternID(value || "")}
                />

                <InternSupervisorsModal
                  data={Encargados}
                  open={ModalSupervisor}
                  ModalClose={ClickCloseSupervisor}
                />
                <InternEmergenciesModal
                  data={Emergencias}
                  open={ModalEmergency}
                  ModalClose={ClickCloseEmergency}
                />
                <InternFilesModal
                  data={Files}
                  open={ModalFiles}
                  ModalClose={ClickCloseFiles}
                />
              </section>

              <section className="info-section-right">
                <div className="info-section-right-options">
                  <img src={MyAvatar} />
                  <div className="info-section-right-options-buttons">
                    <EditButton onClick={EditPage} editing={editable} />

                    <ConfirmationModal
                      open={saveEdit}
                      onConfirm={ConfirmSave}
                      onCancel={CancelSave}
                      title="Confirmación de guardado"
                      message="¿Estás seguro que deseas guardar los cambios?"
                    />
                    <ButtonComponent
                      text="Generar Tarjeta del practicante"
                      onClick={() =>
                        navigate(
                          "/interns/intern-information/interns-credentials"
                        )
                      }
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
                  onChange={(value) => setInternTotalTime(value || "")}
                />
                <InfoRow
                  label="Tiempo cubierto:"
                  value="254 horas"
                  id="startDate"
                  type="text"
                  show={InternType === "Externo" || InternType === "Interno"}
                  editable={false} onChange={function (value?: string): void {
                    throw new Error("Function not implemented.");
                  } }                />
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
                  <ButtonComponent text="Generar un reporte" onClick={Click} />
                </div>
              </div>
            </div>
            <div className="comments-container">
              <CommentsTable />
            </div>
          </div>
        </section>
      </div>
      <Footer />
      <FormModal
        open={open}
        onConfirm={onConfirm}
        onCancel={Close}
        title="Generar reporte del practicante"
        type="Generete"
        entity="report"
      />
    </div>
  );
};

export default InternInformationPage;
