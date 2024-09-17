import { AuditsCard } from "./audits-card.component";

export const AuditsTable = () => {
  const audits = [
    {
      action: "ACTUALIZACIÓN",
      responsable: "JUAN JOSE",
      entity: [
        {
          type: "INTERN",
          name: "LUIS FERNANDO",
          email: "qKpZb@example.com",
          phone: "123456789",
        },
      ],
      date: "2022-01-01",
    },
    {
      action: "INSERCCIÓN",
      responsable: "JUAN JOSE",
      entity: [
        {
          type: "DEPARTMENT",
          name: "FINANZAS",
        },
      ],
      date: "2022-01-01",
    },
    {
      action: "ACTUALIZACIÓN",
      responsable: "JUAN JOSE",
      entity: [
        {
          type: "INTERN",
          name: "MIGUEL ANGEL",
          email: "qKpZb@example.com",
          phone: "123456789",
        },
      ],
      date: "2022-01-01",
    },
    {
      action: "INSERCCIÓN",
      responsable: "JUAN JOSE",
      entity: [
        {
          type: "INTERN",
          name: "YOSHUA RAYMUNDO MORENO ARREDONDO",
          email: "qKpZb@example.com",
          phone: "123456789",
        },
      ],
      date: "2022-01-01",
    },
    {
      action: "ELIMINACIÓN",
      responsable: "ALEXANDER FERNANDO",
      entity: [
        {
          type: "DEPARTMENT",
          name: "FINANZAS",
        },
      ],
      date: "2022-01-01",
    },
  ];
  return (
    <div className="audits-table">
      <div className="table-headers">
        <span>Acción</span>
        <span>Responsable</span>
        <span>Entidad</span>
        <span>Fecha</span>
      </div>
      <div>
        {audits.map((audit, index) => (
          <AuditsCard
            key={index}
            action={audit.action}
            responsable={audit.responsable}
            entity={audit.entity}
            date={audit.date}
          />
        ))}
      </div>
    </div>
  );
};
