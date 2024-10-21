import { da } from "date-fns/locale";
import { InfoRow } from "../inputs/info-row.component"
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { formatPhoneNumber } from "../../functions/utils.functions";

interface ProfileDataProps {
    type ?: string
    data ?: any
}
export const ProfileData: React.FC<ProfileDataProps> = ({data}) => {
    return (
        <div className="profile-data-main-container">
           <div className="profile-data-container-header">
                        <PersonRoundedIcon sx={{fontSize: '1.5rem'}} />
                        <h1>Datos Personales</h1>
                    </div>
                    <div className="profile-data-container">
                    <div className="profile-data-container-left-column">
                        <h4>Informacion general</h4>
                        <InfoRow label="Dirección" value={data.address} id="Name" type="textarea" editable={false} show={true} onChange={function (value?: string): void {
                        throw new Error("Function not implemented.");
                    } } />
                        <InfoRow label="Tel Personal" value={formatPhoneNumber(data.phone)} id="Name" editable={false} show={true} onChange={function (value?: string): void {
                        throw new Error("Function not implemented.");
                    } } />
                        <InfoRow label="Tipo de sangre" value={data.bloodType} id="Name" editable={false} show={true} onChange={function (value?: string): void {
                        throw new Error("Function not implemented.");
                    } } />
                        <InfoRow label="Correo" value={data.user.email} id="Name" editable={false} show={true} onChange={function (value?: string): void {
                        throw new Error("Function not implemented.");
                    } } />
                        <InfoRow label="Encargado" value="BRIAN WILFRIDO ROMERO CUPUL" id="Name" editable={false} show={true} onChange={function (value?: string): void {
                        throw new Error("Function not implemented.");
                    } } />
                        <InfoRow label="Departamento de practicas" value={data.internshipDepartment.name} id="Name" editable={false} show={true} onChange={function (value?: string): void {
                        throw new Error("Function not implemented.");
                    } } />
                        <h4>Informacion escolar</h4>
                        <InfoRow label="Institución de procedencia" value={data.institution.name} id="Name" editable={false} show={true} onChange={function (value?: string): void {
                        throw new Error("Function not implemented.");
                    } } />
                        <InfoRow label="Carrera" value={data.career.name} id="Name" editable={false} show={true} onChange={function (value?: string): void {
                        throw new Error("Function not implemented.");
                    } } />
                        <InfoRow label="Matricula" value={data.schoolEnrollment} id="Name" editable={false} show={true} onChange={function (value?: string): void {
                        throw new Error("Function not implemented.");
                    } } />
                        <InfoRow label="Telefono institución" value={data.institution.phone} id="Name" editable={false} show={true} onChange={function (value?: string): void {
                        throw new Error("Function not implemented.");
                    } } />
              
                    </div>

                    <div className="profile-data-container-right-column">
                    <InfoRow label="Fecha de inicio" value="01-01-2022" id="Name" editable={false} show={true} onChange={function (value?: string): void {
                        throw new Error("Function not implemented.");
                    } } />
                    <InfoRow label="Fecha de finalizacio" value="01-01-2022" id="Name" editable={false} show={true} onChange={function (value?: string): void {
                        throw new Error("Function not implemented.");
                    } } />
                    <InfoRow label="Hora de entrada" value="09:00 AM" id="Name" editable={false} show={true} onChange={function (value?: string): void {
                        throw new Error("Function not implemented.");
                    } } />
                    <InfoRow label="Hora de salida" value="17:00 PM" id="Name" editable={false} show={true} onChange={function (value?: string): void {
                        throw new Error("Function not implemented.");
                    } } />
                    <InfoRow label="Total de tiempo a cubrir" value="600 horas" id="Name" editable={false} show={true} onChange={function (value?: string): void {
                        throw new Error("Function not implemented.");
                    } } />

                    </div>
                    </div>
        </div>
    )
}