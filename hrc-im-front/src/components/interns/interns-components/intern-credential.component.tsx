import Barcode from "react-barcode";
import { ButtonComponent } from "../../buttons/buttons.component";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';
import { useRef } from "react";
import '../../components.css';
import { DataIntern, GetByIDDataInter } from "../../../interfaces/interns/interns.interface";
import { Divider } from "@mui/material";
interface InternCredentialProps {
  data?: GetByIDDataInter;
}
export const InternCredentialComponent: React.FC<InternCredentialProps> = ({
  data,
}) => {
    const navigate = useNavigate ();
    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <div className="intern-credential-container">
      <div className="intern-credential-header">
        <h1>Generar credencial del practicante</h1>
      </div>

      <div className="intern-credential-body" ref={contentRef}>
        <section className="intern-credential-left">
          <h3>{data?.user.firstName + " " + data?.user.lastName || ""}</h3>
          <Barcode value={data?.externalInternCode ? data?.externalInternCode : data?.internalInternCode ? data?.internalInternCode : ""} />
        </section>
        <section className="intern-credential-right">
          <h3>{data?.user.firstName + " " + data?.user.lastName || ""}</h3>
          <label>Datos generales</label>
          <Divider variant="middle" sx={{marginTop: "1rem"}}/>
          <p>{data?.phone}</p>
          <p>{data?.address}</p>
          {data?.institution && 
          <div>  
          <p>{data?.institution.name}</p>
          <p>{data?.institution.phone}</p>
          </div>
        
          
          }
          <label>Datos del hotel</label>
          <Divider variant="middle" sx={{marginTop: "1rem"}}/>
          <p>{data?.property.name}</p>
          <p>{data?.internshipDepartment.name}</p>
        </section>
      </div>

      <div className="intern-credential-footer">
        <ButtonComponent text="Imprimir credencial" onClick={reactToPrintFn} />
        <ButtonComponent  text="Cancelar" type="cancel" onClick={() => navigate(-1)} />
      </div>
    </div>
  );
};
