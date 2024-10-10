import { Divider, Paper, Typography } from "@mui/material";
import { CheckInCheckOutCard } from "./check-in-check-out-card.component";
import { TableProps } from "../../audits/audits-table.component";
export   const practicantes = [
  {
    id: "95debf2f-f87d-4363-b310-4833376a8d51",
    nombre: "MARTIN MARTINEZ AREAS",
    departamento: "TI",
    tipo: "EXTERNO",
    type_check: "ENTRADA",
    date: "10/10/2022 10:00",
  },
  {
    id: "95debf2f-f87d-4363-b310-4833376a8d52",
    nombre: "LEONARDO DANIEL REBOLLO CALERO",
    departamento: "TI",
    tipo: "EXTERNO",
    type_check: "SALIDA",
    date: "10/10/2022 09:00",
  },
  {
    id: "95debf2f-f87d-4363-b310-4833376a8d53",
    nombre: "ARMIN BORGES COB",
    departamento: "TI",
    tipo: "INTERNO",
    type_check: "ENTRADA",
    date: "09/10/2022 10:00",
  },
  {
    id: "95debf2f-f87d-4363-b310-4833376a8d54",
    nombre: "CRYSTIAN ADAMIR CARRERA RIVAS",
    departamento: "TI",
    tipo: "EXTERNO",
    type_check: "SALIDA NO REGISTRADA",
    date: "09/10/2022 09:00",
  },
  {
    id: "95debf2f-f87d-4363-b310-4833376a8d55",
    nombre: "YOSHUA RAYMUNDO MORENO ARREDONDO",
    departamento: "TI",
    tipo: "INTERNO",
    type_check: "RETARDO",
    date: "09/10/2022 10:00",
  },
  {
    id: "95debf2f-f87d-4363-b310-4833376a8d51",
    nombre: "MARTIN MARTINEZ AREAS",
    departamento: "TI",
    tipo: "INTERNO",
    type_check: "ENTRADA",
    date: "10/10/2022 10:00",
  },
  {
    id: "95debf2f-f87d-4363-b310-4833376a8d52",
    nombre: "LEONARDO DANIEL REBOLLO CALERO",
    departamento: "TI",
    tipo: "INTERNO",
    type_check: "SALIDA",
    date: "10/10/2022 09:00",
  },
  {
    id: "95debf2f-f87d-4363-b310-4833376a8d53",
    nombre: "ARMIN BORGES COB",
    departamento: "TI",
    tipo: "INTERNO",
    type_check: "ENTRADA",
    date: "09/10/2022 10:00",
  },
  {
    id: "95debf2f-f87d-4363-b310-4833376a8d54",
    nombre: "CRYSTIAN ADAMIR CARRERA RIVAS",
    departamento: "TI",
    tipo: "INTERNO",
    type_check: "SALIDA NO REGISTRADA",
    date: "09/10/2022 09:00",
  },
  {
    id: "95debf2f-f87d-4363-b310-4833376a8d55",
    nombre: "YOSHUA RAYMUNDO MORENO ARREDONDO",
    departamento: "TI",
    tipo: "INTERNO",
    type_check: "RETARDO",
    date: "09/10/2022 10:00",
  },
];
export const CheckInCheckOutTable: React.FC<TableProps> = ({ data = [] }) => {


  const groupByDate = (items: any[]) => {
    return items.reduce((acc: any, item: any) => {
      const date = item.date.split(" ")[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});
  };

  const groupedPracticantes = groupByDate(data);


  

  return (
    <div className="interns-table">
      <div className="table-headers">
        <span>Practicante</span>
        <span>Tipo aviso</span>
        <span>Fecha y hora</span>
      </div>
      <div className="table-checkin-checkout-body">
      {Object.keys(groupedPracticantes).map((date) => (
        <div key={date}>
          <Divider sx={{ marginY: ".5%" }} />
          <Typography variant="subtitle1" color="textSecondary">
            {new Date(date).toLocaleDateString()}
          </Typography>

          {groupedPracticantes[date].map((practicante: any) => (
            <CheckInCheckOutCard
              key={practicante.id}
              id={practicante.id}
              nombre={practicante.nombre}
              departamento={practicante.departamento}
              tipo={practicante.tipo}
              type_check={practicante.type_check}
              date={practicante.date}
            />
          ))}
        </div>
      ))}
      </div>

    </div>
  );
};
