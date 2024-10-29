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
import { useLocation, useNavigate } from "react-router-dom";
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
import {
  DataIntern,
  GetByIDDataInter,
  GetByIDInternInterface,
  InternsInterface,
} from "../../interfaces/interns/interns.interface";
import { getInternById } from "../../api/interns/interns.api";
import { set } from "date-fns";
import {
  CircularProgress,
  NothingToSee,
} from "../../components/utils/circular-progress.component";
import { RetryElement } from "../../components/utils/retry-element.component";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { decryptData } from "../../functions/encrypt-data.function";

const InternInformationPage = () => {
  const [internData, setInternData] = useState<GetByIDDataInter>();
  const { pathname } = useLocation();

  // Expresión regular para capturar UUID
  const uuidMatch = pathname.match(/intern-information\/([a-fA-F0-9-]{36})/);
  const internId = uuidMatch ? uuidMatch[1] : null;
  const [editable, setEditable] = useState(false);
  const [saveEdit, setSaveEdit] = useState(false);
  const [progreso, setProgreso] = useState(45);
  const [showModal, setShowModal] = useState(false);
  const [InternType, setInternType] = useState<string>("");
  const [ModalSupervisor, setModalSupervisor] = useState(false);
  const [ModalEmergency, setModalEmergency] = useState(false);
  const [ModalFiles, setModalFiles] = useState(false);
  const userRol = useSelector(
    (state: RootState) => decryptData(state.auth.rol || "") || ""
  );
  const [InternName, setInternName] = useState("");
  const [InternEmail, setInternEmail] = useState("");
  const [InternUniversity, setInternUniversity] = useState("");
  const [InternProgram, setInternProgram] = useState("");
  const [InternInstitutePhone, setInternInstitutePhone] = useState("");
  const [InternBloodType, setInternBloodType] = useState("");
  const [InternPhone, setInternPhone] = useState("");
  const [InternAddress, setInternAddress] = useState("");
  const [InternSupervisor, setInternSupervisor] = useState("internData");
  const [InternID, setInternID] = useState("");
  const [InternDepartment, setInternDepartment] = useState("");
  const [InternOldDepartment, setInternOldDepartment] = useState("");
  const [InterBeginDate, setInternBeginDate] = useState("");
  const [InternEndDate, setInternEndDate] = useState("");
  const [InternCheckIn, setInternCheckIn] = useState("");
  const [InternCheckOut, setInternCheckOut] = useState("");
  const [InternTotalTime, setInternTotalTime] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const userToken = sessionStorage.getItem("_Token") || "";

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const Open = () => setOpen(true);
  const Close = () => setOpen(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const fetchedData: GetByIDInternInterface | null = await getInternById(
        userToken,
        internId || ""
      );
      if (fetchedData) {
        console.log(fetchedData.data);
        setInternType(
          fetchedData.data.department === null ? "Externo" : "Interno"
        );
        setInternData(fetchedData.data);
        setInternEmail(fetchedData.data.user.email);
        setInternName(
          fetchedData.data.user.firstName + " " + fetchedData.data.user.lastName
        );

        if (fetchedData.data.institution) {
          setInternUniversity(fetchedData.data.institution.name);
          setInternProgram(fetchedData.data.career.name);
        }
        if (fetchedData.data.department) {
          setInternOldDepartment(fetchedData.data.department.name);
        }

        setInternBloodType(fetchedData.data.bloodType);
        setInternDepartment(fetchedData.data.internshipDepartment.name);
        setInternPhone(fetchedData.data.phone);
        setInternAddress(fetchedData.data.address);
        setInternBeginDate(fetchedData.data.internshipStart.toString());
        setInternEndDate(fetchedData.data.internshipEnd.toString());
        setInternCheckIn(fetchedData.data.entryTime);
        setInternCheckOut(fetchedData.data.exitTime);
        set;
        setHasError(false);
      } else {
        setInternData(undefined);
        setHasError(true);
      }
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userToken]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("edit") === "true") {
      setEditable(true);
    }
  }, [location]);

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
        {isLoading ? (
          <CircularProgress type="secondary" />
        ) : hasError ? (
          <RetryElement onClick={() => fetchData()} />
        ) : (
          <>
            <section className="interns-information-header">
              <div
                className={`interns-information-title-type  ${internData?.department ? "intern" : "extern"}`}
              >
                <h2>
                  PRACTICANTE {internData?.department ? "INTERNO" : "EXTERNO"}
                </h2>
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
                    <h3>
                      {internData?.user?.firstName} {internData?.user?.lastName}
                    </h3>

                    <InfoRow
                      label="Tel Personal:"
                      value={InternPhone}
                      id="telPersonal"
                      type="text"
                      editable={editable}
                      show={
                        InternType === "Externo" || InternType === "Interno"
                      }
                      onChange={(value) => setInternPhone(value || "")}
                    />
                    <InfoRow
                      label="Correo:"
                      value={InternEmail}
                      id="email"
                      type="text"
                      editable={editable}
                      show={
                        InternType === "Externo" || InternType === "Interno"
                      }
                      onChange={(value) => setInternEmail(value || "")}
                    />
                    <InfoRow
                      label="Dirección:"
                      value={InternAddress}
                      id="address"
                      type="textarea"
                      editable={editable}
                      show={
                        InternType === "Externo" || InternType === "Interno"
                      }
                      onChange={(value) => setInternAddress(value || "")}
                    />
                    <InfoRow
                      label="Tipo de sangre:"
                      value={InternBloodType || "Sin datos disponibles"}
                      id="encargado"
                      type="text"
                      editable={editable}
                      show={
                        InternType === "Externo" || InternType === "Interno"
                      }
                      onChange={(value) => setInternBloodType(value || "")}
                    />
                    <InfoRow
                      label="Departamento de practicas:"
                      value={InternDepartment}
                      id="oldDepartment"
                      type="text"
                      editable={editable}
                      show={
                        InternType === "Externo" || InternType === "Interno"
                      }
                      onChange={(value) => setInternDepartment(value || "")}
                    />
                    <InfoRow
                      label="Departamento de procedencia:"
                      value={InternOldDepartment}
                      id="department"
                      type="text"
                      editable={editable}
                      show={InternType === "Interno"}
                      onChange={(value) => setInternDepartment(value || "")}
                    />
                    <div className="info-section-left-options">
                      <div className="info-section-left-options-label">
                        <label>Encargados:</label>
                      </div>
                      <div className="info-section-left-options-encargados">
                        {(internData?.internshipDepartment?.supervisors &&
                          (internData.internshipDepartment.supervisors.length >
                          1 ? (
                            <button onClick={ClickOpenSupervisor}>
                              {"( " +
                                internData.internshipDepartment.supervisors
                                  .length +
                                " )"}{" "}
                              Ver todos
                            </button>
                          ) : (
                            internData.internshipDepartment.supervisors
                              .length === 1 && (
                              <p>
                                {internData.internshipDepartment.supervisors[0]
                                  .user.firstName +
                                  " " +
                                  internData.internshipDepartment.supervisors[0]
                                    .user.lastName}
                              </p>
                            )
                          ))) ||
                          "Sin encargados"}
                      </div>
                    </div>

                    <div className="info-section-left-options">
                      <div className="info-section-left-options-label">
                        <label>Contactos de emergencia:</label>
                      </div>
                      <div className="info-section-left-options-encargados">
                        {internData?.emergencyContacts &&
                          (internData?.emergencyContacts.length > 1 ? (
                            <button onClick={ClickOpenEmergency}>
                              {"( " +
                                internData?.emergencyContacts.length +
                                " )"}{" "}
                              Ver todos
                            </button>
                          ) : (
                            internData?.emergencyContacts.length === 1 && (
                              <p>{internData?.emergencyContacts[0].name}</p>
                            )
                          ))}
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
                        <SchoolRoundedIcon />{" "}
                        <h3>Información de la institución</h3>
                      </div>
                    )}

                    <InfoRow
                      label="Institución de procedencia:"
                      value={InternUniversity}
                      id="institution"
                      type="text"
                      editable={editable}
                      show={InternType === "Externo"}
                      onChange={(value) => setInternUniversity(value || "")}
                    />
                    <InfoRow
                      label="Carrera:"
                      value={InternProgram}
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
                      data={internData?.internshipDepartment?.supervisors}
                      open={ModalSupervisor}
                      ModalClose={ClickCloseSupervisor}
                    />
                    <InternEmergenciesModal
                      data={internData?.emergencyContacts || []}
                      internId={internData?.id || ""}
                      open={ModalEmergency}
                      onUpdate={() => fetchData()}
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
                       
                        {userRol != "SUPERVISOR" && (
                          <>
                           <EditButton onClick={EditPage} editing={editable} />
                           <ButtonComponent
                            text="Generar Tarjeta del practicante"
                            onClick={() =>
                              navigate(
                                "/interns/intern-information/interns-credentials" +
                                  `/${internData?.id}`
                              )
                            }
                          />
                          </>
                       
                        )}

                        <ConfirmationModal
                          open={saveEdit}
                          onConfirm={ConfirmSave}
                          onCancel={CancelSave}
                          title="Confirmación de guardado"
                          message="¿Estás seguro que deseas guardar los cambios?"
                        />
                      </div>
                    </div>
                    <InfoRow
                      label="Fecha de inicio:"
                      value={InterBeginDate}
                      id="startDate"
                      type="date"
                      editable={editable}
                      show={
                        InternType === "Externo" || InternType === "Interno"
                      }
                      onChange={(value) => setInternBeginDate(value || "")}
                    />
                    <InfoRow
                      label="Fecha de fin:"
                      value={InternEndDate}
                      id="startDate"
                      type="date"
                      editable={editable}
                      show={
                        InternType === "Externo" || InternType === "Interno"
                      }
                      onChange={(value) => setInternEndDate(value || "")}
                    />
                    <InfoRow
                      label="Hora entrada:"
                      value={InternCheckIn}
                      id="startDate"
                      type="time"
                      editable={editable}
                      show={
                        InternType === "Externo" || InternType === "Interno"
                      }
                      onChange={(value) => setInternCheckIn(value || "")}
                    />
                    <InfoRow
                      label="Hora salida:"
                      value={InternCheckOut}
                      id="startDate"
                      type="time"
                      editable={editable}
                      show={
                        InternType === "Externo" || InternType === "Interno"
                      }
                      onChange={(value) => setInternCheckOut(value || "")}
                    />
                    <InfoRow
                      label="Total de tiempo a cubrir:"
                      value="600 horas"
                      id="startDate"
                      type="date"
                      editable={editable}
                      show={
                        InternType === "Externo" || InternType === "Interno"
                      }
                      onChange={(value) => setInternTotalTime(value || "")}
                    />
                    <InfoRow
                      label="Tiempo cubierto:"
                      value="254 horas"
                      id="startDate"
                      type="text"
                      show={
                        InternType === "Externo" || InternType === "Interno"
                      }
                      editable={false}
                      onChange={function (value?: string): void {
                        throw new Error("Function not implemented.");
                      }}
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
                        text="Generar un reporte"
                        onClick={Click}
                      />
                    </div>
                  </div>
                </div>
                <div className="comments-container">
                  <CommentsTable />
                </div>
              </div>
            </section>
          </>
        )}
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
