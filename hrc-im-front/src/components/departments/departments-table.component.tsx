import '../components.css';
import { DepartmentsCard } from './departments-card.component';


export const DepartmentsTable = () => {
  const deparments = [
    {
      id: 1,
      name: "RECURSOS HUMANOS",
    },
    {
      id: 2,
      name: "TECNOLOGIAS DE INFORMACIÓN",
    },
    {
      id: 3,
      name: "CONTABILIDAD",
    },
    {
        id: 3,
        name: "ENTRENAMIENTO",
      },
      {
        id: 3,
        name: "Departamento 3",
      },
      {
        id: 3,
        name: "Departamento 3",
      },
      {
        id: 3,
        name: "Departamento 3",
      },
      {
        id: 3,
        name: "Departamento 3",
      },
      {
        id: 3,
        name: "Departamento 3",
      },
  ];
  return (
  <div className='interns-table'>
   <div className="table-headers">
    <span>Nombre departamento</span>
    <span>Acciones</span>
  </div>
  <div >
          {deparments.map((department, index) => (
      <DepartmentsCard key={index} name={department.name} />
    ))}
    </div>
  </div>
  

  


  );
};
