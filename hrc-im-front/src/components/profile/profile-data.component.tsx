import { InfoRow } from "../inputs/info-row.component"
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
export const ProfileData = () => {
    return (
        <div>
           <div className="profile-data-container-header">
                        <PersonRoundedIcon sx={{fontSize: '2.5rem'}} />
                        <h1>Datos Personales</h1>
                    </div>
                    <div className="profile-data-container">
                    <div className="profile-data-container-left-column">
                        <InfoRow label="Institución de procedencia" value="UNIVERSIDAD POLITÉCNICA DE QUINTANA ROO" id="Name" editable={false} show={true} />
                        <InfoRow label="Carrera" value="INGENIERÍA EN SOFTWARE" id="Name" editable={false} show={true} />
                        <InfoRow label="Matricula" value="202100167" id="Name" editable={false} show={true} />
                        <InfoRow label="Tel Personal" value="998 476 8123" id="Name" editable={false} show={true} />
                        <InfoRow label="Correo" value="998 476 8156" id="Name" editable={false} show={true} />
                        <InfoRow label="Encargado" value="BRIAN WILFRIDO ROMERO CUPUL" id="Name" editable={false} show={true} />
                        <InfoRow label="Departamento" value="TECNOLOGÍA DE LA INFORMACIÓN" id="Name" editable={false} show={true} />
                    </div>

                    <div className="profile-data-container-right-column">
                    <InfoRow label="Fecha de inicio" value="01-01-2022" id="Name" editable={false} show={true} />
                    <InfoRow label="Fecha de finalizacio" value="01-01-2022" id="Name" editable={false} show={true} />
                    <InfoRow label="Hora de entrada" value="09:00 AM" id="Name" editable={false} show={true} />
                    <InfoRow label="Hora de salida" value="17:00 PM" id="Name" editable={false} show={true} />
                    <InfoRow label="Total de tiempo a cubrir" value="600 horas" id="Name" editable={false} show={true} />

                    </div>
                    </div>
        </div>
    )
}