import Barcode from "react-barcode";
import { ButtonComponent } from "../../buttons/buttons.component";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';
import { useRef } from "react";
import '../../components.css';
interface InternCredentialProps {
  data?: any;
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
          <h3>{data.name}</h3>
          <Barcode value={data.internCode} />
        </section>
        <section className="intern-credential-right">
          <h3>{data.name}</h3>
          <label>Datos generales</label>
          <p>{data.address}</p>
          <p>{data.institution.name}</p>
          <label>Datos del hotel</label>
        </section>
      </div>

      <div className="intern-credential-footer">
        <ButtonComponent text="Imprimir credencial" onClick={reactToPrintFn} />
        <ButtonComponent  text="Cancelar" type="cancel" onClick={() => navigate(-1)} />
      </div>
    </div>
  );
};
