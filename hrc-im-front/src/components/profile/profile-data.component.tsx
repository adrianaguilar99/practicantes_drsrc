import { da } from "date-fns/locale";
import { InfoRow } from "../inputs/info-row.component";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { formatPhoneNumber } from "../../functions/utils.functions";
import { GetByIDDataInter } from "../../interfaces/interns/interns.interface";

interface ProfileDataProps {
    type ?: string
    data?: GetByIDDataInter
}

export const ProfileData: React.FC<ProfileDataProps> = ({ data }) => {
    return (
        <div className="profile-data-main-container">
            <div className="profile-data-container-header">
                <PersonRoundedIcon sx={{ fontSize: '1.5rem' }} />
                <h1>Datos Personales</h1>
            </div>
            <div className="profile-data-container">
                <div className="profile-data-container-left-column">
                    <h4>Informacion general</h4>
                    <InfoRow 
                        label="Nombre" 
                        value={data?.user?.firstName && data?.user?.lastName 
                            ? `${data.user.firstName} ${data.user.lastName}` 
                            : "Nombre no disponible"} 
                        id="Name" 
                        type="textarea" 
                        editable={false} 
                        show={true} 
                        onChange={() => { }} 
                    />
                    <InfoRow 
                        label="Tel Personal" 
                        value={data?.phone ? formatPhoneNumber(data.phone) : "Teléfono no disponible"} 
                        id="phone" 
                        type="phone"
                        editable={false} 
                        show={true} 
                        onChange={() => { }} 
                    />
                    <InfoRow 
                        label="Tipo de sangre" 
                        value={data?.bloodType || "No especificado"} 
                        id="bloodType" 
                        type="text"
                        editable={false} 
                        show={true} 
                        onChange={() => { }} 
                    />
                    <InfoRow 
                        label="Correo" 
                        type="text"
                        value={data?.user?.email || "Correo no disponible"} 
                        id="email" 
                        editable={false} 
                        show={true} 
                        onChange={() => { }} 
                    />
                    <InfoRow 
                        label="Encargado" 
                        value="BRIAN WILFRIDO ROMERO CUPUL" 
                        id="supervisor" 
                        editable={false} 
                        type="text"
                        show={true} 
                        onChange={() => { }} 
                    />
                    {data?.department && (
                        <InfoRow 
                            label="Departamento de procedencia" 
                            value={data?.department?.name || "No disponible"} 
                            id="internshipDepartment" 
                            type="text"
                            editable={false} 
                            show={true} 
                            onChange={() => { }} 
                        />
                    )}
                    <InfoRow 
                        label="Departamento de prácticas" 
                        value={data?.internshipDepartment?.name || "No disponible"} 
                        id="internshipDepartment" 
                             type="text"
                        editable={false} 
                        show={true} 
                        onChange={() => { }} 
                    />
                  
                    {data?.institution && (
                        <>
                          <h4>Informacion escolar</h4>
                            <InfoRow 
                                label="Institución de procedencia" 
                                value={data?.institution?.name || "No disponible"} 
                                id="institutionName" 
                                editable={false} 
                                     type="text"
                                show={true} 
                                onChange={() => { }} 
                            />
                            <InfoRow 
                                label="Carrera" 
                                value={data?.career?.name || "No disponible"} 
                                id="career" 
                                     type="text"
                                editable={false} 
                                show={true} 
                                onChange={() => { }} 
                            />
                            <InfoRow 
                                label="Matricula" 
                                value={data?.schoolEnrollment || "No disponible"} 
                                id="schoolEnrollment" 
                                     type="text"
                                editable={false} 
                                show={true} 
                                onChange={() => { }} 
                            />
                            <InfoRow 
                                label="Telefono institución" 
                                value={data?.institution?.phone || "No disponible"} 
                                id="institutionPhone" 
                                     type="text"
                                editable={false} 
                                show={true} 
                                onChange={() => { }} 
                            />
                        </>
                    )}
                </div>

                <div className="profile-data-container-right-column">
                    <InfoRow 
                        label="Fecha de inicio" 
                        value={data?.internshipStart ? new Date(data.internshipStart).toLocaleDateString() : "Fecha no disponible"} 
                        id="beginDate" 
                        type="text"
                        editable={false} 
                        show={true} 
                        onChange={() => { }} 
                    />
                    <InfoRow 
                        label="Fecha de finalización" 
                        value={data?.internshipEnd ? new Date(data.internshipEnd).toLocaleDateString() : "Fecha no disponible"} 
                        id="endDate" 
                        type="text"
                        editable={false} 
                        show={true} 
                        onChange={() => { }} 
                    />
                    <InfoRow 
                        label="Total de tiempo a cubrir" 
                        value={data?.internshipDuration?.hours ? `${data.internshipDuration.hours} horas` : "Duración no disponible"} 
                        id="totalHours" 
                        type="text"
                        editable={false} 
                        show={true} 
                        onChange={() => { }} 
                    />
                </div>
            </div>
        </div>
    );
};
