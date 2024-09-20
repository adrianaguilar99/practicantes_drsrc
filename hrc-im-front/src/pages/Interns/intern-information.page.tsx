import { InfoRow } from "../../components/interns/interns-components/info-row.component";
import { Navbar } from "../../components/navbars/navbar.component";
import { Breadcrumb } from "../../components/utils/breadcrumb.component";
import { useState } from "react";
import  MyAvatar  from "../../assets/images/avatar-test.jpg"
import { ButtonComponent } from "../../components/buttons/button.component";
import { CommentsTable } from "../../components/interns/interns-components/comments-table.component";

const InternInformationPage = () => {
  const [editable, setEditable] = useState(false);
  const EditPage = () => {
    if (editable) {
      setEditable(false);
    } else {
      setEditable(true);
    }
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
            <h2>PRACTICANTE EXTERNO</h2>
          </div>
          <div className="interns-information-title-name">
            <h1>INFORMACION DEL PRACTICANTE</h1>
          </div>
        </section>
        <section className="interns-information-body">
          <div className="nav-space"></div>
          <div className="info-section">
          <div className="info-container">
          
          <section className="info-section-left">
            <h3>LEONARDO DANIEL REBOLLO CALERO</h3>
            <InfoRow
              label="Institución de procedencia:"
              value="UNIVERSIDAD POLITÉCNICA DE QUINTANA ROO"
              id="institution"
              editable={editable}
            />
            <InfoRow
              label="Carrera:"
              value="INGENIERÍA EN SOFTWARE"
              id="career"
              type="text"
              editable={editable}
            />
            <InfoRow
              label="Matrícula escolar:"
              value="202100167"
              id="matricula"
              type="text"
              editable={editable}
            />
            <InfoRow
              label="Tel Institucional:"
              value="998 476 8123"
              type="text"
              id="telInstitutional"
              editable={editable}
            />
            <InfoRow
              label="Tel Personal:"
              value="998 476 8156"
              id="telPersonal"
              type="text"
              editable={editable}
            />
            <InfoRow
              label="Correo:"
              value="leonardod.rebollo@gmail.com"
              id="email"
              type="email"
              editable={editable}
            />
            <InfoRow
              label="Encargado:"
              value="BRIAN WILFRIDO ROMERO CUPUL"
              id="encargado"
              type="text"
              editable={editable}
            />
            <InfoRow
              label="Departamento:"
              value="Tecnologías de la Información"
              id="department"
              type="text"
              editable={editable}
            />
          </section>
          
          <section className="info-section-right">
            <div className="info-section-right-options">
              <img src={MyAvatar} />
              <div className="info-section-right-options-buttons">
                <ButtonComponent text="Editar información" onClick={EditPage} />
                <ButtonComponent text="Generar reporte semanal" onClick={function (): void {
                  throw new Error("Function not implemented.");
                }} />
                <ButtonComponent text="Generar reporte mensual" onClick={function (): void {
                  throw new Error("Function not implemented.");
                }} />

              </div>

            </div>
            <InfoRow
              label="Fecha de inicio:"
              value="01-01-2022"
              id="startDate"
              type="date"
              editable={editable}
            />
            <InfoRow
              label="Fecha de fin:"
              value="01-01-2022"
              id="startDate"
              type="date"
              editable={editable}
            />
            <InfoRow
              label="Hora entrada:"
              value="09:00 a.m."
              id="startDate"
              type="date"
              editable={editable}
            />
            <InfoRow
              label="Hora salida:"
              value="17:00 p.m."
              id="startDate"
              type="date"
              editable={editable}
            />
            <InfoRow
              label="Total de tiempo a cubrir:"
              value="600 horas"
              id="startDate"
              type="date"
              editable={editable}
            />
            <InfoRow
              label="Tiempo cubierto:"
              value="254 horas"
              id="startDate"
              type="date"
              editable={editable}
            />

          </section>
          <div className="intern-progress-space">
            <p>Progreso del practicante</p>
            <div className="progress-bar">
              <div className="progress-bar-inner"></div>
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
