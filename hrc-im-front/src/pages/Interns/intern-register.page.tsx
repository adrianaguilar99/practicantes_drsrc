import { Navbar } from "../../components/navbars/navbar.component";
import { Breadcrumb } from "../../components/utils/breadcrumb.component";
import { useEffect, useState } from "react";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import "./interns.page.css";
import { RegisterRow } from "../../components/inputs/register-row.component";
import ContactPhoneRoundedIcon from "@mui/icons-material/ContactPhoneRounded";
import { ButtonComponent } from "../../components/buttons/buttons.component";
import { Footer } from "../../components/navbars/footer.component";
import { FormModal } from "../../components/modals/form-modal.component";
import { EmergencyContactsRegister } from "../../components/interns/interns-components/emergency-contacts-register.component";
import { InputValidators } from "../../functions/input-validators.functions";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import {
  CareersInterface,
  DataCareer,
} from "../../interfaces/careers/careers.intarface";
import { getCareersData } from "../../api/interns/careers/careers.api";
import { getInstitutionsData } from "../../api/interns/institutions/institutions.api";
import {
  DataInstitution,
  InstitutionsInterface,
} from "../../interfaces/institutions/institutions.interface";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { formatPhoneNumber } from "../../functions/utils.functions";
import { getDepartmentsData } from "../../api/departments/departments.api";
import {
  DataDepartment,
  DepartmentsInterface,
} from "../../interfaces/departments/departments.interface";
import { getPropertiesData } from "../../api/properties/propertie.api";
import {
  DataProperty,
  PropertiesInterface,
} from "../../interfaces/properties/properties.interface";
import { postInternFunction } from "../../functions/intern-functions/post-intern.function";
import { DataEmergencyContact } from "../../interfaces/interns/emergency-contacts/emergency-contacts.interface";
import { set } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Contacts } from "@mui/icons-material";
import {
  InternScheduleModal,
  ScheduleRegister,
} from "../../components/interns/interns-schedule/intern-schedule-modal.component";
import {
  DataSchedule,
  PostSchedule,
} from "../../interfaces/interns/intern-schedule/intern-schedule.interface";
import Backdrop from "@mui/material/Backdrop";
import { CircularProgress } from "@mui/material";
import { FileUpload, imageAccept, pdfAccept } from "../../components/inputs/file-input.component";
import { Accept } from "react-dropzone";

const InternRegisterPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedType, setSelectedType] = useState("Interno");

  const [InternFirstName, setInternFirstName] = useState("");
  const [InternLastName, setInternLastName] = useState("");
  const [InternEmail, setInternEmail] = useState("");
  const [InternType, setInternType] = useState("Interno");

  const [InternUniversity, setInternUniversity] = useState("");
  const [InternProgram, setInternProgram] = useState("");
  const [InternID, setInternID] = useState("");
  const [InternInstitutePhone, setInternInstitutePhone] = useState("");
  const [InternProperty, setInternProperty] = useState("");

  const [InternPhone, setInternPhone] = useState("");
  const [InternDepartment, setInternDepartment] = useState("");

  const [InternOldDepartment, setInternOldDepartment] = useState("");

  const [InterBeginDate, setInternBeginDate] = useState("");
  const [InternEndDate, setInternEndDate] = useState("");
  const [InternTotalTime, setInternTotalTime] = useState("");
  const [InternWorkCode, setInternWorkCode] = useState("");
  const [InternAddress, setInternAddress] = useState("");
  const [InternPicture, setInternPicture] = useState<File | null>(null);
  const [InternFiles, setInternFiles] = useState<File | null>(null);
  const defaultPassword = import.meta.env.VITE_DEFAULT_PASSWORD || "";
  const [InternPassword, setInternPassword] = useState<string>(defaultPassword);
  const [InternBloodType, setInternBloodType] = useState("");
  const [InternContacts = [], setInternContacts] = useState<
    DataEmergencyContact[]
  >([]);
  const [InternSchedule, setInternSchedule] = useState<any>(null);

  interface EmergencyContacts {
    name: string;
    relationship: string;
    phone: string;
  }

  const [InternEmergencyContacts, setInternEmergencyContacts] = useState<
    EmergencyContacts[]
  >([]);

  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({
    internName: undefined,
    internLastName: undefined,
    internEmail: undefined,
    internPhone: undefined,
    internAddress: undefined,
    internDepartment: undefined,
    internOldDepartment: undefined,
    internUniversity: undefined,
    internProgram: undefined,
    internID: undefined,
    internInstitutePhone: undefined,
    internBeginDate: undefined,
    internEndDate: undefined,
    internTotalTime: undefined,
    internPicture: undefined,
    internFiles: undefined,
    internWorkCode: undefined,
    InternProperty: undefined,
    InternContacts: undefined,
    InternSchedule: undefined,
  });

  const [open, setOpen] = useState(false);
  const [entity, setEntity] = useState<string>("");
  const ModalOpen = () => setOpen(true);
  const ModalClose = () => setOpen(false);
  const userToken = sessionStorage.getItem("_Token") || "";
  const [Careers, setCareers] = useState<DataCareer[]>([]);
  const [Institutions, setInstitutions] = useState<DataInstitution[]>([]);
  const [Departments, setDepartments] = useState<DataDepartment[]>([]);
  const [Properties, setProperties] = useState<DataProperty[]>([]);
  const [formAction, setFormAction] = useState<boolean>(false);
  const [hasErrors, setHasErrors] = useState<boolean>(false);
  const newErrors: { [key: string]: string | undefined } = {};
  const [summitPressed, setSummitPressed] = useState<boolean>(false);
  const navigate = useNavigate();
  const [sendingState, setSendingState] = useState<boolean>(false);

  const TypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
    setInternType(e.target.value);
  };

  const fetchCareers = async () => {
    try {
      const fetchedData: CareersInterface | null =
        await getCareersData(userToken);
      if (fetchedData) {
        setCareers(fetchedData.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const fetchedData: DepartmentsInterface | null =
        await getDepartmentsData(userToken);
      if (fetchedData) {
        setDepartments(fetchedData.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchInstitutions = async () => {
    try {
      const fetchedData: InstitutionsInterface | null =
        await getInstitutionsData(userToken);
      if (fetchedData) {
        setInstitutions(fetchedData.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProperties = async () => {
    try {
      const fetchedData: PropertiesInterface | null =
        await getPropertiesData(userToken);
      if (fetchedData) {
        setProperties(fetchedData.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCareers();
    fetchInstitutions();
    fetchDepartments();
    fetchProperties();
  }, [userToken]);

  const InputValidation = () => {
    const validators = InputValidators();

    const resultName = validators.string(InternFirstName);
    if (resultName) {
      newErrors.internName = resultName;
    }

    const resultLastName = validators.string(InternLastName);
    if (resultLastName) {
      newErrors.internLastName = resultLastName;
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

    const resultPassword = validators.password(InternPassword);
    if (resultPassword) {
      newErrors.internPassword = resultPassword;
    }

    if (InternBloodType === "Seleccione un tipo" || InternBloodType === "") {
      newErrors.internBloodType = "Seleccione un tipo";
    }

    if (InternType === "Interno") {
      const resultOldDepartment = validators.string(InternOldDepartment);
      if (resultOldDepartment) {
        newErrors.internOldDepartment = resultOldDepartment;
      }

      const resultWorkCode = validators.number(InternWorkCode);
      if (resultWorkCode) {
        newErrors.internWorkCode = resultWorkCode;
      }
      if (InternWorkCode.length < 6) {
        newErrors.internWorkCode = "El código debe tener 6 dígitos";
      }
    }

    if (InternType === "Externo") {
      const resultUniversity = validators.string(InternUniversity);
      if (resultUniversity) {
        newErrors.internUniversity = resultUniversity;
      }

      const resultProgram = validators.string(InternProgram);
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

    if (InterBeginDate > InternEndDate) {
      newErrors.internEndDate =
        "La fecha de inicio debe ser menor a la fecha de finalización";
    }
    if (InternEndDate < InterBeginDate) {
      newErrors.internBeginDate =
        "La fecha de finalización debe ser mayor a la fecha de inicio";
    }

    const resultTotalTime = validators.string(InternTotalTime);
    if (resultTotalTime) {
      newErrors.internTotalTime = resultTotalTime;
    }

    if (InternTotalTime < "120") {
      newErrors.internTotalTime =
        "La duración mínima de practicas es de 120 horas";
    }

    const resultPicture = validators.fileImage(InternPicture as File);
    if (resultPicture) {
      newErrors.internPicture = resultPicture;
    }

    const resultFiles = validators.filePDF(InternFiles as File);
    if (resultFiles) {
      newErrors.internFiles = resultFiles;
    }

    const resultPropertie = validators.string(InternProperty);
    if (resultPropertie) {
      newErrors.internProperty = resultPropertie;
    }

    if (InternContacts.length < 2) {
      newErrors.internContacts = "Debe agregar al menos dos contactos";
    }

    if (InternSchedule.length < 1) {
      newErrors.internSchedule = "Debe agregar al menos un horario";
    }

    setErrors(newErrors);
    if (
      !newErrors.internProperty &&
      !newErrors.internName &&
      !newErrors.internEmail &&
      !newErrors.internPhone &&
      !newErrors.internAddress &&
      !newErrors.internDepartment &&
      !newErrors.internOldDepartment &&
      !newErrors.internUniversity &&
      !newErrors.internProgram &&
      !newErrors.internID &&
      !newErrors.internInstitutePhone &&
      !newErrors.internBeginDate &&
      !newErrors.internEndDate &&
      !newErrors.internWorkCode &&
      !newErrors.internPicture &&
      !newErrors.internFiles &&
      !newErrors.internTotalTime &&
      !newErrors.internContacts &&
      !newErrors.internSchedule
    ) {
      setSummitPressed(true);
      setHasErrors(false);
      setFormAction(true);
      setSendingState(true);
    } else {
      setHasErrors(true);
      setFormAction(false);
      setSummitPressed(false);
      setSendingState(false);
    }
  };


  
  const formSubmit = () => {
    if (hasErrors === false && formAction === true) {
      postInternFunction({
        userToken: userToken,
        internType: InternType,
        dataUser: {
          firstName: InternFirstName,
          lastName: InternLastName,
          email: InternEmail,
          password: InternPassword,
        },
        dataIntern: {
          bloodType: InternBloodType,
          phone: InternPhone,
          address: InternAddress,
          schoolEnrollment: InternID,
          internshipStart: InterBeginDate,
          internshipEnd: InternEndDate,
          internshipDuration: InternTotalTime + " hours",
          status: "ACTIVE",
          internalInternCode: InternWorkCode,
          careerId: InternProgram,
          departmentId: InternOldDepartment,
          internshipDepartmentId: InternDepartment,
          institutionId: InternUniversity,
          propertyId: InternProperty,
        },
        contacts: InternContacts,
        dataFiles: {
          photo: InternPicture as File,
          compiledDocuments: InternFiles as File,
        },
        dataSchedule: InternSchedule,

        onSuccess: () => {
          setSendingState(false);
          setInternContacts([]);
          console.log("Usuario registrado correctamente");
          navigate("/interns");
        },
        onError: () => {
          setSendingState(false);
          setHasErrors(true);
          setSummitPressed(false);
          console.log("Error al registrar el usuario");
        },
      });
    } else {
      setSummitPressed(false);
      setSendingState(false);
    }
  };

  useEffect(() => {
    if (summitPressed) {
      formSubmit();
    }
  }, [summitPressed]);

  const ReceiveContacts = (contacts: DataEmergencyContact[]) => {
    setInternContacts(contacts);
  };

  const ReceiveSchedule = (schedule: DataSchedule[]) => {
    setInternSchedule(schedule);
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
        <section className="interns-register-body">
          <div className="nav-space"></div>
          {sendingState ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "60vh",
                width: "100%",
              }}
            >
              <CircularProgress />
              <h2 style={{ marginLeft: "5%" }}>
                Registrando a {" " + InternFirstName + " " + InternLastName}
              </h2>
            </div>
          ) : (
            <div>
              <div className="register-section-interns">
                <div className="register-container">
                  <section className="register-section-left">
                    <RegisterRow
                      label="Nombres del practicante:"
                      onChange={(value) =>
                        setInternFirstName((value as string) || "")
                      }
                      id="firstname"
                      type="text"
                      show={true}
                      validate={errors.internName ? "Error" : "Normal"}
                      typeError={errors.internName}
                    />
                    <RegisterRow
                      label="Apellidos del practicante:"
                      onChange={(value) =>
                        setInternLastName((value as string) || "")
                      }
                      id="lastname"
                      type="text"
                      show={true}
                      validate={errors.internLastName ? "Error" : "Normal"}
                      typeError={errors.internLastName}
                    />

                    <RegisterRow
                      label="Correo:"
                      onChange={(value) =>
                        setInternEmail((value as string) || "")
                      }
                      id="email"
                      type="text"
                      show={true}
                      validate={errors.internEmail ? "Error" : "Normal"}
                      typeError={errors.internEmail}
                    />
                    <RegisterRow
                      label="Tel Personal:"
                      onChange={(value) =>
                        setInternPhone((value as string) || "")
                      }
                      value={formatPhoneNumber(InternPhone)}
                      id="celphone"
                      type="phone"
                      maxLength={10}
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
                      onChange={(value) =>
                        setInternAddress((value as string) || "")
                      }
                      id="address"
                      type="text"
                      show={true}
                      validate={errors.internAddress ? "Error" : "Normal"}
                      typeError={errors.internAddress}
                    />
                    <RegisterRow
                      label="Tipo de sangre:"
                      onChange={(value) =>
                        setInternBloodType((value as string) || "")
                      }
                      id="bloodtype"
                      type="select"
                      show={true}
                      options={[
                        "Seleccione un tipo",
                        "A+",
                        "A-",
                        "B+",
                        "B-",
                        "AB+",
                        "AB-",
                        "O+",
                        "O-",
                      ]}
                      validate={errors.internBloodType ? "Error" : "Normal"}
                      typeError={errors.internBloodType}
                    />
                    <p
                      className="register-intern-suggestion"
                      onClick={() => {
                        setEntity("departments");
                        ModalOpen();
                      }}
                    >
                      ¿No encuetra el departamento que busca? Registrar un
                      departamento
                    </p>
                    <RegisterRow
                      label="Departamento de practicas:"
                      onChange={(value) => {
                        const selectedDepartment = Departments.find(
                          (department) => department.name === value
                        );
                        setInternDepartment(
                          selectedDepartment
                            ? selectedDepartment.id.toString()
                            : ""
                        );
                      }}
                      id="department"
                      type="select"
                      show={true}
                      options={[
                        { id: "", name: "Seleccione un departamento" },
                        ...Departments.map((department) => ({
                          id: department.id,
                          name: department.name,
                        })),
                      ].map((department) => department.name)}
                      validate={errors.internDepartment ? "Error" : "Normal"}
                      typeError={errors.internDepartment}
                    />

                    <RegisterRow
                      label="Departamento de procedencia:"
                      onChange={(value) => {
                        const selectedDepartment = Departments.find(
                          (department) => department.name === value
                        );
                        setInternOldDepartment(
                          selectedDepartment
                            ? selectedDepartment.id.toString()
                            : ""
                        );
                      }}
                      id="department"
                      type="select"
                      options={[
                        { id: "", name: "Seleccione un departamento" },
                        ...Departments.map((department) => ({
                          id: department.id,
                          name: department.name,
                        })),
                      ].map((department) => department.name)}
                      show={selectedType === "Interno"}
                      validate={errors.internOldDepartment ? "Error" : "Normal"}
                      typeError={errors.internOldDepartment}
                    />

                    {selectedType === "Externo" && (
                      <div className="register-intern-divider">
                        <SchoolRoundedIcon />{" "}
                        <h3>Información de la institución</h3>
                      </div>
                    )}
                    {selectedType === "Externo" && (
                      <p
                        className="register-intern-suggestion"
                        onClick={() => {
                          setEntity("interns-institutions");
                          ModalOpen();
                        }}
                      >
                        ¿No encuetra una institución? Registrar una institución
                      </p>
                    )}
                    <RegisterRow
                      label="Institución de procedencia:"
                      onChange={(value) => {
                        const selectedInstitution = Institutions.find(
                          (institution) => institution.name === value
                        );
                        setInternUniversity(
                          selectedInstitution
                            ? selectedInstitution.id.toString()
                            : ""
                        );
                        setInternInstitutePhone(
                          selectedInstitution
                            ? selectedInstitution.phone.toString()
                            : ""
                        );
                      }}
                      id="institution"
                      type="autocomplete"
                      coincidences={Institutions.map(
                        (institution: { name: any }) => institution.name
                      )}
                      show={selectedType === "Externo"}
                      validate={errors.internUniversity ? "Error" : "Normal"}
                      typeError={errors.internUniversity}
                    />
                    {selectedType === "Externo" && (
                      <p
                        className="register-intern-suggestion"
                        onClick={() => {
                          setEntity("interns-careers");
                          ModalOpen();
                        }}
                      >
                        ¿No encuetra una carrera? Registrar una carrera
                      </p>
                    )}

                    <RegisterRow
                      label="Carrera:"
                      onChange={(value) => {
                        const selectedCareer = Careers.find(
                          (career) => career.name === value
                        );
                        setInternProgram(
                          selectedCareer ? selectedCareer.id.toString() : ""
                        );
                      }}
                      id="career"
                      type="autocomplete"
                      coincidences={Careers.map(
                        (career: { name: any }) => career.name
                      )}
                      show={selectedType === "Externo"}
                      validate={errors.internProgram ? "Error" : "Normal"}
                      typeError={errors.internProgram}
                    />

                    <RegisterRow
                      label="Matrícula escolar:"
                      onChange={(value) => setInternID((value as string) || "")}
                      id="matricula"
                      type="number"
                      show={selectedType === "Externo"}
                      validate={errors.internID ? "Error" : "Normal"}
                      typeError={errors.internID}
                    />
                    <RegisterRow
                      label="Tel Institucional:"
                      onChange={(value) =>
                        setInternInstitutePhone((value as string) || "")
                      }
                      type="phone"
                      value={InternInstitutePhone}
                      id="telInstitutional"
                      show={selectedType === "Externo"}
                      validate={
                        errors.internInstitutePhone ? "Error" : "Normal"
                      }
                      typeError={errors.internInstitutePhone}
                      editable={false}
                    />
                  </section>

                  <section className="register-section-middle">
                    <RegisterRow
                      label="Codigo de empleado:"
                      onChange={(value) =>
                        setInternWorkCode((value as string) || "")
                      }
                      id="workCode"
                      value={InternWorkCode}
                      type="text"
                      maxLength={6}
                      show={selectedType === "Interno"}
                      validate={errors.internWorkCode ? "Error" : "Normal"}
                      typeError={errors.internWorkCode}
                    />
                    <RegisterRow
                      label="Constraseña:"
                      onChange={(value) =>
                        setInternPassword((value as string) || "")
                      }
                      id="password"
                      value={InternPassword}
                      type="password"
                      show={true}
                      validate={errors.internPassword ? "Error" : "Normal"}
                      typeError={errors.internPassword}
                    />
                    <RegisterRow
                      label="Propiedad:"
                      onChange={(value) => {
                        const selectedProperty = Properties.find(
                          (property) => property.name === value
                        );
                        setInternProperty(
                          selectedProperty ? selectedProperty.id.toString() : ""
                        );
                      }}
                      id="property"
                      type="select"
                      show={true}
                      options={[
                        { id: "", name: "Seleccione una propiedad" },
                        ...Properties.map((property) => ({
                          id: property.id,
                          name: property.name,
                        })),
                      ].map((property) => property.name)}
                      validate={errors.internProperty ? "Error" : "Normal"}
                      typeError={errors.internProperty}
                    />
                    <RegisterRow
                      label="Fecha de inicio:"
                      onChange={(value) =>
                        setInternBeginDate((value as string) || "")
                      }
                      id="startDate"
                      type="date"
                      show={true}
                      validate={errors.internBeginDate ? "Error" : "Normal"}
                      typeError={errors.internBeginDate}
                    />
                    <RegisterRow
                      label="Fecha de fin:"
                      onChange={(value) =>
                        setInternEndDate((value as string) || "")
                      }
                      id="endDate"
                      type="date"
                      show={true}
                      validate={errors.internEndDate ? "Error" : "Normal"}
                      typeError={errors.internEndDate}
                    />
                    <RegisterRow
                      label="Total de horas a cubrir:"
                      onChange={(value) =>
                        setInternTotalTime((value as string) || "")
                      }
                      id="tiempoTotal"
                      type="number"
                      show={true}
                      validate={errors.internTotalTime ? "Error" : "Normal"}
                      typeError={errors.internTotalTime}
                    />

                    <div className="register-intern-divider">
                      <CalendarMonthIcon /> <h3>Horario</h3>
                    </div>
                    {errors.internSchedule && (
                      <p className="register-error">{errors.internSchedule}</p>
                    )}
                    <ScheduleRegister onSendSchedule={ReceiveSchedule} />
                  </section>
                  <section className="register-section-right">
                    <div className="register-intern-divider">
                      <UploadFileOutlinedIcon />{" "}
                      <h3>Archivos del practicante</h3>
                    </div>
                    {errors.internFiles || errors.internPicture && (
                      <p className="register-error">Rellene todos los campos</p>
                    )}
                    <FileUpload
                      label="Foto:"
                      accept={imageAccept}
                      onChange={setInternPicture}
                    />
                    <br></br>
                    <FileUpload
                      label="Archivos del practicante:"
                      accept={pdfAccept}
                      onChange={setInternFiles}
                    />
                    <div className="register-intern-divider">
                      <ContactPhoneRoundedIcon />{" "}
                      <h3>Contactos de emergencia</h3>
                    </div>
                    {errors.internContacts && (
                      <p className="register-error">{errors.internContacts}</p>
                    )}
                    <EmergencyContactsRegister
                      onReceiveContacts={ReceiveContacts}
                    />
                  </section>
                </div>
              </div>

              <div className="button-container-intern">
                <ButtonComponent text="Guardar" onClick={InputValidation} />
                <ButtonComponent
                  text="Cancelar"
                  onClick={() => history.back()}
                  style={{ backgroundColor: "#D32F2F" }}
                />
              </div>
            </div>
          )}
        </section>
      </div>
      <FormModal
        open={open}
        onConfirm={() => {
          fetchCareers();
          fetchInstitutions();
          fetchDepartments();
        }}
        onCancel={ModalClose}
        title="Agregar"
        type="Add"
        entity={entity}
      />
      <Footer />
    </div>
  );
};

export default InternRegisterPage;
