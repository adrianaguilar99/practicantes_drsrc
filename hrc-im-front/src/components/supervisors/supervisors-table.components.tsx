import { SupervisorsCard } from "./supervisors-card.component";

export const SupervisorsTable = () => {
    const supervisors = [
        {
            name: "JUAN JOSE",
            department: "RECURSOS HUMANOS",
        },
        { 
            name: "BRIAN WILFRIDO ROMERO CUPUL",
            department: "TECNOLOGIAS DE INFORMACIÓN",
        },
        {
            name: "MIGUEL ANGEL GARCIA RODRIGUEZ",
            department: "CONTABILIDAD",
        },
        {
            name : "ALEXANDER RODRIGUEZ RODRIGUEZ",
            department: "ENTRENAMIENTO",
        }
    ]
  return (

    <div className="interns-table">
      <div className="table-headers">
        <span>Nombre Supervisor</span>
        <span>Departamento</span>
        <span>Acciones</span>
      </div>
      <div>
        {supervisors.map((supervisor, index) => (
         <SupervisorsCard key={index} name={supervisor.name} department={supervisor.department} />
        ))}
      </div>
    </div>
  );
};
