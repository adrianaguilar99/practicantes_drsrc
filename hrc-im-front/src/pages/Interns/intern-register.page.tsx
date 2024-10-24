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
import { formatPhoneNumber } from "../../functions/utils.functions";
import { getDepartmentsData } from "../../api/departments/departments.api";
import { DataDepartment, DepartmentsInterface } from "../../interfaces/departments/departments.interface";
import { getPropertiesData } from "../../api/properties/propertie.api";
import { DataProperty, PropertiesInterface } from "../../interfaces/properties/properties.interface";
import { postInternFunction } from "../../functions/intern-functions/post-intern.function";

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
  const [InternSupervisor, setInternSupervisor] = useState("");
  const [InternDepartment, setInternDepartment] = useState("");

  const [InternOldDepartment, setInternOldDepartment] = useState("");

  const [InterBeginDate, setInternBeginDate] = useState("");
  const [InternEndDate, setInternEndDate] = useState("");
  const [InternCheckIn, setInternCheckIn] = useState("");
  const [InternCheckOut, setInternCheckOut] = useState("");
  const [InternTotalTime, setInternTotalTime] = useState("");

  const [InternAddress, setInternAddress] = useState("");

  const [InternPicture, setInternPicture] = useState("");
  const [InternCurp, setInternCurp] = useState("");
  const [InternProofofaddress, setInternProofofaddress] = useState("");
  const [InternBirthCertificate, setInternBirthCertificate] = useState("");
  const [InternMedicalInsurance, setInternMedicalInsurance] = useState("");
  const defaultPassword = import.meta.env.VITE_DEFAULT_PASSWORD || "";
  const [InternPassword, setInternPassword] = useState<string>(defaultPassword);
  const [InternBloodType, setInternBloodType] = useState("A+");

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
    internPicture: undefined,
    internCurp: undefined,
    internProofofaddress: undefined,
    internBirthCertificate: undefined,
    internMedicalInsurance: undefined,
    InternProperty: undefined,
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
    }catch (error) {
      console.log(error);
    }
  }

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

  const formSubmit = () => {
    const validators = InputValidators();
    const newErrors: { [key: string]: string | undefined } = {};

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

    const resutSupervisor = validators.string(InternSupervisor);
    if (resutSupervisor) {
      newErrors.internSupervisor = resutSupervisor;
    }

    if (InternType === "Interno") {
      const resultOldDepartment = validators.string(InternOldDepartment);
      if (resultOldDepartment) {
        newErrors.internOldDepartment = resultOldDepartment;
      }
    }

    if (InternType === "Externo") {
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

    const resultPicture = validators.fileImage(InternPicture);
    if (resultPicture) {
      newErrors.internPicture = resultPicture;
    }

    const resultCurp = validators.filePDF(InternCurp);
    if (resultCurp) {
      newErrors.internCurp = resultCurp;
    }

    const resultBirthCertificate = validators.filePDF(InternBirthCertificate);
    if (resultBirthCertificate) {
      newErrors.internBirthCertificate = resultBirthCertificate;
    }

    const resultProofofaddress = validators.filePDF(InternProofofaddress);
    if (resultProofofaddress) {
      newErrors.internProofofaddress = resultProofofaddress;
    }

    const resultMedicalInsurance = validators.filePDF(InternMedicalInsurance);
    if (resultMedicalInsurance) {
      newErrors.internMedicalInsurance = resultMedicalInsurance;
    }

    const resultPropertie = validators.string(InternProperty);
    if (resultPropertie) {
      newErrors.internProperty = resultPropertie;
    }
    setErrors(newErrors);
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
              status: "ACTIVE",    
              careerId: InternProgram,
              departmentId: InternOldDepartment,
              internshipDepartmentId: InternDepartment,
              institutionId: InternUniversity,
              propertyId: InternProperty,
            },
            onSuccess: () => {
              console.log("Usuario registrado correctamente");
            }
          });

    // if(!newErrors.internProperty && 
    //   !newErrors.internName && 
    //   !newErrors.internEmail && 
    //   !newErrors.internPhone &&
    //   !newErrors.internAddress &&
    //   !newErrors.internDepartment &&
    //   !newErrors.internSupervisor &&
    //   !newErrors.internOldDepartment &&
    //   !newErrors.internUniversity &&
    //   !newErrors.internProgram &&
    //   !newErrors.internID &&
    //   !newErrors.internInstitutePhone &&
    //   !newErrors.internBeginDate &&
    //   !newErrors.internEndDate &&
    //   !newErrors.internCheckIn &&
    //   !newErrors.internCheckOut &&
    //   !newErrors.internTotalTime &&
    //   !newErrors.internPicture && 
    //   !newErrors.internCurp && 
    //   !newErrors.internBirthCertificate && 
    //   !newErrors.internProofofaddress && 
    //   !newErrors.internMedicalInsurance){
    //     postInternFunction({
    //       userToken: userToken, // O simplemente `userToken` si es una variable existente con el mismo nombre
    //       dataUser: {
    //         firstName: InternFirstName,
    //         lastName: InternLastName,
    //         email: InternEmail,
    //         password: InternPassword,
    //       },
    //       onSuccess: () => {
    //         // Acción a realizar en caso de éxito, si la necesitas
    //         console.log("Usuario registrado correctamente");
    //       }
    //     });
    //   }
        

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

          <div>
            <div className="register-section-interns">
              <div className="register-container">
                <section className="register-section-left">
                  <RegisterRow
                    label="Nombres del practicante:"
                    onChange={(value) => setInternFirstName(value || "")}
                    id="firstname"
                    type="text"
                    show={true}
                    validate={errors.internName ? "Error" : "Normal"}
                    typeError={errors.internName}
                  />
                  <RegisterRow
                    label="Apellidos del practicante:"
                    onChange={(value) => setInternLastName(value || "")}
                    id="lastname"
                    type="text"
                    show={true}
                    validate={errors.internLastName ? "Error" : "Normal"}
                    typeError={errors.internLastName}
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
                    value={formatPhoneNumber(InternPhone)}
                    id="celphone"
                    type="phone"
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
                    label="Tipo de sangre:"
                    onChange={(value) => setInternBloodType(value || "")}
                    id="bloodtype"
                    type="select"
                    show={true}
                    options={["A+", "A-", "B+","B-","AB+","AB-","O+","O-"]}
                    validate={errors.internAddress ? "Error" : "Normal"}
                    typeError={errors.internAddress}
                  />
                  <p
                      className="register-intern-suggestion"
                      onClick={() => {
                        setEntity("departments");
                        ModalOpen();
                      }}
                    >
                      ¿No encuetra el departamento que busca? Registrar un departamento
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
                      ...Departments.map((department) => ({ id: department.id, name: department.name }))
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
                      ...Departments.map((department) => ({ id: department.id, name: department.name }))
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
                    type="phone"
                    value={InternInstitutePhone} 
                    id="telInstitutional"
                    show={selectedType === "Externo"}
                    validate={errors.internInstitutePhone ? "Error" : "Normal"}
                    typeError={errors.internInstitutePhone}
                    editable={false} 
                  />

                 
                </section>

                <section className="register-section-middle">
                <RegisterRow
                    label="Constraseña:"
                    onChange={(value) => setInternPassword(value || "")}
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
                        selectedProperty
                          ? selectedProperty.id.toString()
                          : ""
                      );
                    }}
                    id="property"
                    type="select"
                    show={true}
                    options={[
                      { id: "", name: "Seleccione una propiedad" },
                      ...Properties.map((property) => ({ id: property.id, name: property.name }))
                    ].map((property) => property.name)}
                    validate={errors.internProperty ? "Error" : "Normal"}
                    typeError={errors.internProperty}
                  />
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
                  {InternEmergencyContacts.length < 2 && (
                    <p className="register-intern-suggestion">
                      Ingrese minimo 2 contactos de emergencia
                    </p>
                  )}
                </section>
                <section className="register-section-right">
                  <div className="register-intern-divider">
                    <UploadFileOutlinedIcon /> <h3>Archivos del practicante</h3>
                  </div>
                  <RegisterRow
                    label="Foto:"
                    onChange={(value) => setInternPicture(value || "")}
                    id="tiempoTotal"
                    type="file"
                    show={true}
                    validate={errors.internPicture ? "Error" : "Normal"}
                    typeError={errors.internPicture}
                  />
                  <RegisterRow
                    label="CURP:"
                    onChange={(value) => setInternCurp(value || "")}
                    id="tiempoTotal"
                    type="file"
                    show={true}
                    validate={errors.internCurp ? "Error" : "Normal"}
                    typeError={errors.internCurp}
                  />
                  <RegisterRow
                    label="Comprobante de domicilio:"
                    onChange={(value) => setInternProofofaddress(value || "")}
                    id="tiempoTotal"
                    type="file"
                    show={true}
                    validate={errors.internProofofaddress ? "Error" : "Normal"}
                    typeError={errors.internProofofaddress}
                  />
                  <RegisterRow
                    label="Acta de nacimiento:"
                    onChange={(value) => setInternBirthCertificate(value || "")}
                    id="tiempoTotal"
                    type="file"
                    show={true}
                    validate={
                      errors.internBirthCertificate ? "Error" : "Normal"
                    }
                    typeError={errors.internBirthCertificate}
                  />
                  <RegisterRow
                    label="Comprobante de seguro medico:"
                    onChange={(value) => setInternMedicalInsurance(value || "")}
                    id="tiempoTotal"
                    type="file"
                    show={true}
                    validate={
                      errors.internMedicalInsurance ? "Error" : "Normal"
                    }
                    typeError={errors.internMedicalInsurance}
                  />
                </section>
              </div>
            </div>

            <div className="button-container-intern">
              <ButtonComponent
                text="Guardar"
                onClick={() => {
                  formSubmit();
                }}
              />
              <ButtonComponent text="Cancelar" onClick={() => history.back()} />
            </div>
          </div>
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
