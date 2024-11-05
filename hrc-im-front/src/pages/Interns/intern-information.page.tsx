import { InfoRow } from "../../components/inputs/info-row.component";
import { Navbar } from "../../components/navbars/navbar.component";
import { Breadcrumb } from "../../components/utils/breadcrumb.component";
import { useEffect, useState } from "react";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import MyAvatar from "../../assets/images/avatar-test.jpg";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
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
  Avatar,
  Box,
  Button,
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
import { getCareersData } from "../../api/interns/careers/careers.api";
import {
  CareersInterface,
  DataCareer,
} from "../../interfaces/careers/careers.intarface";
import {
  DataDepartment,
  DepartmentsInterface,
} from "../../interfaces/departments/departments.interface";
import { getDepartmentsData } from "../../api/departments/departments.api";
import { getInstitutionsData } from "../../api/interns/institutions/institutions.api";
import {
  DataInstitution,
  InstitutionsInterface,
} from "../../interfaces/institutions/institutions.interface";
import { getPropertiesData } from "../../api/properties/propertie.api";
import {
  DataProperty,
  PropertiesInterface,
} from "../../interfaces/properties/properties.interface";
import { getFilesSPLIT } from "../../api/interns/intern-files/intern-files.api";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { patchInternFunction } from "../../functions/intern-functions/patch-intern-function";
import { enqueueSnackbar } from "notistack";
import { ca } from "date-fns/locale";
import { InternsSchedule } from "../../components/interns/interns-schedule/intern-schedule.component";
import { InputValidators } from "../../functions/input-validators.functions";

const InternInformationPage = () => {
  const userToken = sessionStorage.getItem("_Token") || "";
  const [internData, setInternData] = useState<GetByIDDataInter>();
  const { pathname } = useLocation();

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
  const [InternFirstName, setInternFirstName] = useState("");
  const [InternLastName, setInternLastName] = useState("");
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
  const [InternWorkCode, setInternWorkCode] = useState("");
  const [InternPhoto, setInternPhoto] = useState("");
  const [InternFile, setInternFile] = useState("");
  const [InternProperty, setInternProperty] = useState("");

  const [PropertyID, setPropertyID] = useState("");
  const [DeparmentID, setDeparmentID] = useState("");
  const [InternShipDepartmentID, setInternShipDepartmentID] = useState("");
  const [CareerID, setCareerID] = useState("");
  const [InstitutionID, setInstitutionID] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);


  const [Careers, setCareers] = useState<DataCareer[]>([]);
  const [Institutions, setInstitutions] = useState<DataInstitution[]>([]);
  const [Departments, setDepartments] = useState<DataDepartment[]>([]);
  const [Properties, setProperties] = useState<DataProperty[]>([]);
  const newErrors: { [key: string]: string | undefined } = {};
  const [Photo, setPhoto] = useState("");
  const [File, setFile] = useState("");

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const Open = () => setOpen(true);
  const Close = () => setOpen(false);

  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({
    internName: undefined,
    internLastName: undefined,
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
    internCheckIn: undefined,
    internCheckOut: undefined,
    internTotalTime: undefined,
    internWorkCode: undefined,
    InternProperty: undefined,
  });

  const validateInputs = () => {

    const validators = InputValidators();

    const resultName = validators.string(InternFirstName);
    if (resultName) {
      newErrors.internName = resultName;
    }

    const resultLastName = validators.string(InternLastName);
    if (resultLastName) {
      newErrors.internLastName = resultLastName;
    }

    const resultPhone = validators.phone(InternPhone);
    if (resultPhone) {
      newErrors.internPhone = resultPhone;
    }

    if(InternBloodType === ""){ 
        newErrors.internBloodType = "Seleccione un tipo de sangre valido";
    }

    const resultAddress = validators.string(InternAddress);
    if (resultAddress) {
      newErrors.internAddress = resultAddress;
    }

    if(InternType === "Interno"){
      const resultDepartment = validators.string(DeparmentID); 
      if (resultDepartment) {
        newErrors.internDepartment = resultDepartment;
      }

      const resultWorkCode = validators.string(InternWorkCode);
    if (resultWorkCode) { 
      newErrors.internWorkCode = resultWorkCode;
    }
    }
 

    const resultOldDepartment = validators.string(InternShipDepartmentID);
    if (resultOldDepartment) {
      newErrors.internOldDepartment = resultOldDepartment;
    }

    if(InternType === "Externo"){
      const resultUniversity = validators.string(InstitutionID);
      if (resultUniversity) {
        newErrors.internUniversity = resultUniversity;
      }

      const resultInternID = validators.string(InternID); 
      if (resultInternID) {
        newErrors.internID = resultInternID;
      }
  
      const resultProgram = validators.string(CareerID); 
      if (resultProgram) {
        newErrors.internProgram = resultProgram;
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

    if(InterBeginDate > InternEndDate){
      newErrors.internEndDate = "La fecha de fin debe ser mayor a la fecha de inicio";
    }

    const resultTotalTime = validators.string(InternTotalTime);
    if (resultTotalTime) {
      newErrors.internTotalTime = resultTotalTime;
    }


    


    setErrors(newErrors);
  }

  const formSubmit = () => {
   

      patchInternFunction({
        userToken: userToken,
        internType: InternType,
        userId: internData?.user.id || "",
        dataUser: {
          firstName: InternFirstName,
          lastName: InternLastName,
        },
        dataIntern: {
          bloodType: InternBloodType,
          phone: InternPhone,
          address: InternAddress,
          schoolEnrollment: InternID,
          internshipStart: InterBeginDate,
          internshipEnd: InternEndDate,
          externalInternCode: internData?.externalInternCode || "",
          internshipDuration: InternTotalTime + " hours",
          status: "ACTIVE",
          internalInternCode: InternWorkCode,
          careerId: CareerID,
          departmentId: DeparmentID,
          internshipDepartmentId: InternShipDepartmentID,
          institutionId: InstitutionID,
          propertyId: PropertyID,
        },
        internId: internId || "",
        onSuccess: () => {
          fetchData();
          setShowModal(false);
        },
        onError: () => {
          enqueueSnackbar("No se pudo actualizar el practicante: ", {
            variant: "error",
          });
        },
      });
    
   
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const fetchedData: GetByIDInternInterface | null = await getInternById(userToken, internId || "");
  
      if (fetchedData) {
        console.log(fetchedData.data);
        setInternType(fetchedData.data.department === null ? "Externo" : "Interno");
        setInternData(fetchedData.data);
        setInternEmail(fetchedData.data.user.email);
        setInternFirstName(fetchedData.data.user.firstName);
        setInternLastName(fetchedData.data.user.lastName);
  
        if (fetchedData.data.institution) {
          setInstitutionID(fetchedData.data.institution.id);
          setCareerID(fetchedData.data.career.id || "");
          setInternUniversity(fetchedData.data.institution.name);
          setInternProgram(fetchedData.data.career.name);
          setInternInstitutePhone(fetchedData.data.institution.phone || "");
          setInternID(fetchedData.data.schoolEnrollment || "");
        }
        if (fetchedData.data.department) {
          setInternOldDepartment(fetchedData.data.department.name);
          setInternWorkCode(fetchedData.data.internalInternCode || "");
          setDeparmentID(fetchedData.data.department.id || "");
        }
        setInternTotalTime(fetchedData.data.internshipDuration.hours || "no hay data");
        setInternBloodType(fetchedData.data.bloodType);
        setInternDepartment(fetchedData.data.internshipDepartment.name);
        setInternPhone(fetchedData.data.phone);
        setInternAddress(fetchedData.data.address);
        setInternBeginDate(fetchedData.data.internshipStart.toString());
        setInternEndDate(fetchedData.data.internshipEnd.toString());
        setInternCheckIn(fetchedData.data.entryTime);
        setInternCheckOut(fetchedData.data.exitTime);
        setInternPhoto(fetchedData.data.internFiles?.photo || "");
        setInternProperty(fetchedData.data.property.name || "");  
        setPropertyID(fetchedData.data.property.id);
        setInternShipDepartmentID(fetchedData.data.internshipDepartment.id);  
        console.log("Foto del practico: ", fetchedData.data.internFiles?.compiledDocuments);
        setInternFile(fetchedData.data.internFiles?.compiledDocuments || "");
        setHasError(false);
        const relatedDataFetches = [fetchDepartments(), fetchProperties()];
        if (fetchedData.data.department === null) {
          relatedDataFetches.push(fetchInstitutions(), fetchCareers());
        }
        await Promise.all(relatedDataFetches);
      } else {
        setInternData(undefined);
        setHasError(true);
      }
    } catch (error) {
      enqueueSnackbar("Error al cargar los datos", { variant: "error" });
      setHasError(true);
    } finally {
      setIsLoading(false);  // Ensures loading is only set to false once all data is loaded
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [internId, userToken]);
  
  const fetchFiles = async () => {
    const splitPhoto = InternPhoto.split("/");
    const photoName = splitPhoto[splitPhoto.length - 1];
    console.log("Nombre de la foto:", photoName);
  
    const splitFile = InternFile.split("/");
    const fileName = splitFile[splitFile.length - 1];
    console.log("Nombre del archivo:", fileName);
  
    try {
      const photoBlob = await getFilesSPLIT(userToken, internId || "", photoName);
      if (photoBlob) {
        const photoUrl = URL.createObjectURL(photoBlob);
        setPhoto(photoUrl);
      } else {
        console.error("No se pudo cargar la foto");
      }
  
      const fileBlob = await getFilesSPLIT(userToken, internId || "", fileName);
      if (fileBlob) {
        const fileUrl = URL.createObjectURL(fileBlob);
        setFile(fileUrl);
        console.log("URL del archivo:", fileBlob);
      } else {
        console.error("No se pudo cargar el archivo");
      }
    } catch (error) {
      console.error("Error en fetchFiles:", error);
    }
  };
  
  useEffect(() => {
    if (InternPhoto && InternFile) {
      fetchFiles();
    }
  }, [InternPhoto, InternFile]);
  
  // Fetch additional data functions
  const fetchCareers = async () => {
    try {
      const fetchedData: CareersInterface | null = await getCareersData(userToken);
      if (fetchedData) {
        setCareers(fetchedData.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const fetchDepartments = async () => {
    try {
      const fetchedData: DepartmentsInterface | null = await getDepartmentsData(userToken);
      if (fetchedData) {
        setDepartments(fetchedData.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const fetchInstitutions = async () => {
    try {
      const fetchedData: InstitutionsInterface | null = await getInstitutionsData(userToken);
      if (fetchedData) {
        setInstitutions(fetchedData.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const fetchProperties = async () => {
    try {
      const fetchedData: PropertiesInterface | null = await getPropertiesData(userToken);
      if (fetchedData) {
        setProperties(fetchedData.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  // Set edit mode if query parameter is "edit"
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("edit") === "true") {
      setEditable(true);
    }
  }, [location]);
  

  const EditPage = () => {
    if (editable) {     
     validateInputs();
     if (Object.keys(newErrors).length === 0) {
     setSaveEdit(true);
     }
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
    formSubmit();
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
        {isLoading  ? (
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
              <TabContext value={value}>
                <Box sx={{ borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab
                      icon={<InfoOutlinedIcon sx={{ fontSize: "1.4rem" }} />}
                      iconPosition="start"
                      label="Informacion"
                      value="1"
                      sx={{ fontSize: ".7rem" }}
                    />
                    <Tab icon={<CalendarMonthIcon sx={{ fontSize: "1.4rem" }} />} iconPosition="start" label="Horario" value="2" sx={{ fontSize: ".7rem" }} />
                  </TabList>
                  <TabPanel value="1" className="info-section-interns" style={{ padding: "0px" }}>
                    <div className="info-container">
                      <section className="info-section-left">
                       
                     
                        {editable ? (
                          <>
                            <InfoRow
                          label="Nombres:"
                          value={InternFirstName}
                          id="firstName"
                          type="text"
                          editable={editable}
                          show={
                            InternType === "Externo" || InternType === "Interno"
                          }
                          onChange={(value) => setInternFirstName(value || "")}
                          validate={errors.internName ? "Error" : "Normal"}
                          typeError={errors.internName}
                        />
                          <InfoRow
                          label="Apellidos:"
                          value={InternLastName}
                          id="lastName"
                          type="text"
                          editable={editable}
                          show={
                            InternType === "Externo" || InternType === "Interno"
                          }
                          onChange={(value) => setInternLastName(value || "")}
                          validate={errors.internLastName ? "Error" : "Normal"}
                          typeError={errors.internLastName}
                        />
                          </>
                        ):(
                          <h3>
                          {internData?.user?.firstName}{" "}
                          {internData?.user?.lastName}
                        </h3>
                        )}

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
                          validate={errors.internPhone ? "Error" : "Normal"}
                          typeError={errors.internPhone}
                        />
                        <InfoRow
                          label="Correo:"
                          value={InternEmail}
                          id="email"
                          type="text"
                          editable={false}
                          show={
                            InternType === "Externo" || InternType === "Interno"
                          }
                          onChange={(value) => setInternEmail(value || "")}
                          validate={errors.internEmail ? "Error" : "Normal"}
                          typeError={errors.internEmail}
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
                          validate={errors.internAddress ? "Error" : "Normal"}
                          typeError={errors.internAddress}
                        />
                        <InfoRow
                          label="Tipo de sangre:"
                          value={InternBloodType || "Sin datos disponibles"}
                          id="bloodType"
                          type={editable ? "select" : "text"}
                          options={[
                            { id: "", name: "Seleccione un tipo" },
                            { id: "A+", name: "A+" },
                            { id: "A-", name: "A-" },
                            { id: "B+", name: "B+" },
                            { id: "B-", name: "B-" },
                            { id: "AB+", name: "AB+" },
                            { id: "AB-", name: "AB-" },
                            { id: "O+", name: "O+" },
                            { id: "O-", name: "O-" },
                          ]}
                          editable={editable}
                          show={
                            InternType === "Externo" || InternType === "Interno"
                          }
                          onChange={(selectedId) =>
                            setInternBloodType(selectedId || "")
                          }
                          validate={errors.internBloodType ? "Error" : "Normal"}
                          typeError={errors.internBloodType}
                        />

                        <InfoRow
                          label="Departamento de prácticas:"
                          value={
                            editable ? InternShipDepartmentID : InternDepartment
                          }
                          id="oldDepartment"
                          type={editable ? "select" : "text"}
                          editable={editable}
                          options={[
                            { id: "", name: "Seleccione un departamento" },
                            ...Departments.map((department) => ({
                              id: department.id,
                              name: department.name,
                            })),
                          ]}
                          show={
                            InternType === "Externo" || InternType === "Interno"
                          }
                          onChange={(selectedId) => {
                            const selectedDepartment = Departments.find(
                              (dept) => dept.id === selectedId
                            );
                            setInternDepartment(
                              selectedDepartment ? selectedDepartment.name : ""
                            );
                            setInternShipDepartmentID(selectedId || "");
                          }}
                          validate={errors.internDepartment ? "Error" : "Normal"}
                          typeError={errors.internDepartment}
                          
                        />

                        <InfoRow
                          label="Departamento de procedencia:"
                          value={editable ? DeparmentID : InternOldDepartment}
                          id="department"
                          type={editable ? "select" : "text"}
                          editable={editable}
                          options={[
                            { id: "", name: "Seleccione un departamento" },
                            ...Departments.map((department) => ({
                              id: department.id,
                              name: department.name,
                            })),
                          ]}
                          show={InternType === "Interno"}
                          onChange={(selectedId) => {
                            const selectedDepartment = Departments.find(
                              (dept) => dept.id === selectedId
                            );
                            setInternOldDepartment(
                              selectedDepartment ? selectedDepartment.name : ""
                            );
                            setDeparmentID(selectedId || "");
                          }}

                        />

                        <div className="info-section-left-options">
                          <div className="info-section-left-options-label">
                            <label>Encargados:</label>
                          </div>
                          <div className="info-section-left-options-encargados">
                            {(internData?.internshipDepartment?.supervisors &&
                              (internData.internshipDepartment.supervisors
                                .length > 1 ? (
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
                                    {internData.internshipDepartment
                                      .supervisors[0].user.firstName +
                                      " " +
                                      internData.internshipDepartment
                                        .supervisors[0].user.lastName}
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
                              <button onClick={ClickOpenFiles}>
                                {"( " + 2 + " )"} Ver todos
                              </button>
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
                          type={editable ? "autocomplete" : "text"}
                          editable={editable}
                          coincidences={Institutions.map(
                            (institution) => institution.name
                          )}
                          show={InternType === "Externo"}
                          onChange={(value) => {
                            setInternUniversity(value || "");
                            const selectedInstitution = Institutions.find(
                              (institution) => institution.name === value
                            );
                            setInstitutionID(
                              selectedInstitution ? selectedInstitution.id : ""
                            );
                            setInternInstitutePhone(
                              selectedInstitution
                                ? selectedInstitution.phone
                                : ""
                            )
                          }}
                          validate={errors.internUniversity ? "Error" : "Normal"}
                          typeError={errors.internUniversity}
                        />

                        <InfoRow
                          label="Carrera:"
                          value={InternProgram}
                          id="career"
                          type={editable ? "autocomplete" : "text"}
                          coincidences={Careers.map((career) => career.name)}
                          editable={editable}
                          show={InternType === "Externo"}
                          onChange={(value) => {
                            setInternProgram(value || "");
                            const selectedCareer = Careers.find(
                              (career) => career.name === value
                            );
                            setCareerID(
                              selectedCareer ? selectedCareer.id : ""
                            );
                          }}
                          validate={errors.internProgram ? "Error" : "Normal"}
                          typeError={errors.internProgram}
                        />

                        <InfoRow
                          label="Matrícula escolar:"
                          value={InternID}
                          id="matricula"
                          type={editable ? "number" : "text"}
                          editable={editable}
                          show={InternType === "Externo"}
                          onChange={(value) => setInternID(value || "")}
                        />

                        <InfoRow
                          label="Tel Internacional:"
                          value={InternInstitutePhone}
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
                          internId={internData?.id || ""}
                          filesId={internData?.internFiles?.id || ""}
                          open={ModalFiles}
                          ModalClose={ClickCloseFiles}
                          onUpdate={() => fetchData()}
                        />
                      </section>

                      <section className="info-section-right">
                        <div className="info-section-right-options">
                        <Avatar alt="Remy Sharp" sx={{ width:  170, height: 170,marginBottom: "2%" }} src={Photo} />
                          <div className="info-section-right-options-buttons">
                            {userRol != "SUPERVISOR" && (
                              <>
                                <EditButton
                                  onClick={EditPage}
                                  editing={editable}
                                />
                                {editable && (
                                   <Button     variant="contained"
                                   color="secondary"
                                   sx={{
                                     bgcolor: "#A0522D",
                                     "&:hover": { bgcolor: "#8b4513" },
                                   }} onClick={() => { fetchData();setEditable(false); setErrors({});} }>Cancelar</Button>
                                )}
                               
                                <ButtonComponent
                                  text="Generar Tarjeta del practicante"
                                  onClick={() =>
                                    navigate(
                                      "/interns/intern-information/interns-credentials" +
                                        `/${internData?.id}`
                                    )
                                  }
                                  style={{ maxHeight: "45px" }}
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
                          label="Codigo de empleado:"
                          value={InternWorkCode}
                          id="InternWorkcode"
                          type="text"
                          editable={editable}
                          show={InternType === "Interno"}
                          onChange={(value) => setInternWorkCode(value || "")}
                          validate={errors.internWorkCode ? "Error" : "Normal"}
                          typeError={errors.internWorkCode}

                        />
                        <InfoRow
                          label="Propiedad:"
                          value={editable ? PropertyID : InternProperty}
                          id="InternPropertyName"
                          type={editable ? "select" : "text"}
                          editable={editable}
                          options={[
                            { id: "", name: "Seleccione una propiedad" },
                            ...Properties.map((property) => ({
                              id: property.id,
                              name: property.name,
                            })),
                          ]}
                          show={
                            InternType === "Externo" || InternType === "Interno"
                          }
                          onChange={(selectedOption) => {
                            const selectedProperty = Properties.find(
                              (prop) => prop.name === selectedOption
                            );
                            setInternDepartment(
                              (selectedOption as string) || ""
                            );
                            setDeparmentID(
                              selectedProperty ? selectedProperty.id : ""
                            );
                          }}
                          validate={errors.internProperty ? "Error" : "Normal"}
                          typeError={errors.internProperty}
                        />
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
                          validate={errors.internBeginDate ? "Error" : "Normal"}
                          typeError={errors.internBeginDate}
                          
                        />
                        <InfoRow
                          label="Fecha de fin:"
                          value={InternEndDate}
                          id="endDate"
                          type="date"
                          editable={editable}
                          show={
                            InternType === "Externo" || InternType === "Interno"
                          }
                          onChange={(value) => setInternEndDate(value || "")}
                          validate={errors.internEndDate ? "Error" : "Normal"}
                          typeError={errors.internEndDate}
                        />
                        <InfoRow
                          label="Total de tiempo a cubrir:"
                          value={InternTotalTime}
                          id="totalTime"
                          type="text"
                          editable={editable}
                          show={
                            InternType === "Externo" || InternType === "Interno"
                          }
                          onChange={(value) => setInternTotalTime(value || "")}
                          validate={errors.internTotalTime ? "Error" : "Normal"}
                          typeError={errors.internTotalTime}
                        />
                      </section>
                      <div className="intern-progress-space-container">
                        <div className="intern-progress-space">
                          <p>Progreso del practicante</p>
                          <div className="progress-section">
                            <span>
                              {internData?.totalInternshipCompletion === 100
                                ? "¡Completado!"
                                : `${internData?.totalInternshipCompletion}%`}
                            </span>
                            <div className="progress-bar">
                              <div
                                className="progress"
                                style={{ width: `${internData?.totalInternshipCompletion}%` }}
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
                      <CommentsTable internId={internData?.id || ""} />
                    </div>
                  </TabPanel>
                  <TabPanel  value="2"  style={{ padding: "0px" }}>
                    <InternsSchedule internId={internData?.id || ""}  />
                  </TabPanel>
                </Box>
              </TabContext>
            </section>
          </>
        )}
      </div>
      <Footer />
      <FormModal
        open={open}
        onConfirm={onConfirm}
        onCancel={Close}
        data={{
          initialDate: internData?.internshipStart || "",
          finalDate: internData?.internshipEnd || "",
        }}
        title="Generar reporte del practicante"
        type="Generete"
        entity="report"
      />
    </div>
  );
};

export default InternInformationPage;
