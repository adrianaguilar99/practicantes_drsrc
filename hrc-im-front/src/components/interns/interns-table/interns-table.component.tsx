import InternCardComponent from './interns-card.component';
import '../../components.css';


const InternsTable = () => {
  const practicantes = [
    { id : "95debf2f-f87d-4363-b310-4833376a8d51", nombre: 'MARTIN MARTINEZ AREAS', departamento: 'TI', progreso: 100, tipo: 'EXTERNO' },
    { id : "95debf2f-f87d-4363-b310-4833376a8d52",nombre: 'LEONARDO DANIEL REBOLLO CALERO', departamento: 'Tecnología de la información', progreso: 43, tipo: 'EXTERNO' },
    { id : "95debf2f-f87d-4363-b310-4833376a8d53", nombre: 'ARMIN BORGES COB', departamento: 'TI', progreso: 100, tipo: 'INTERNO' },
    { id : "95debf2f-f87d-4363-b310-4833376a8d54", nombre: 'CRYSTIAN ADAMIR CARRERA RIVAS', departamento: 'COCINA', progreso: 87, tipo: 'EXTERNO' },
    { id : "95debf2f-f87d-4363-b310-4833376a8d55", nombre: 'YOSHUA RAYMUNDO MORENO ARREDONDO', departamento: 'ENTRETENIMIENTO', progreso: 94, tipo: 'INTERNO' },
    { id : "95debf2f-f87d-4363-b310-4833376a8d56", nombre: 'YOSHUA RAYMUNDO MORENO ARREDONDO', departamento: 'ENTRETENIMIENTO', progreso: 94, tipo: 'INTERNO' },
    { id : "95debf2f-f87d-4363-b310-4833376a8d57", nombre: 'CRYSTIAN ADAMIR CARRERA RIVAS', departamento: 'COCINA', progreso: 87, tipo: 'EXTERNO' },
    { id : "95debf2f-f87d-4363-b310-4833376a8d58", nombre: 'YOSHUA RAYMUNDO MORENO ARREDONDO', departamento: 'ENTRETENIMIENTO', progreso: 94, tipo: 'INTERNO' },
    { id : "95debf2f-f87d-4363-b310-4833376a8d59", nombre: 'CRYSTIAN ADAMIR CARRERA RIVAS', departamento: 'COCINA', progreso: 87, tipo: 'EXTERNO' },
    { id : "95debf2f-f87d-4363-b310-4833376a8d60", nombre: 'CRYSTIAN ADAMIR CARRERA RIVAS', departamento: 'COCINA', progreso: 54, tipo: 'EXTERNO' },
    { id : "95debf2f-f87d-4363-b310-4833376a8d61", nombre: 'CRYSTIAN ADAMIR CARRERA RIVAS', departamento: 'COCINA', progreso: 87, tipo: 'EXTERNO' },
  ];


return (
  <div className="interns-table">
  {/* Encabezados */}
  <div className="table-headers">
    <span>Tipo practicante</span>
    <span>Practicante</span>
    <span>Progreso</span>
    <span>Acciones</span>
  </div>
  
  {/* Filas de datos */}
  {practicantes.map((practicante) => (
    <InternCardComponent
      key={practicante.id}
      id={practicante.id}
      nombre={practicante.nombre}
      departamento={practicante.departamento}
      progreso={practicante.progreso}
      tipo={practicante.tipo as 'INTERNO' | 'EXTERNO'}
      onEdit={() => alert(`Editando a ${practicante.nombre}`)}
      onDelete={() => alert(`Eliminando a ${practicante.nombre}`)}
    />
  ))}
</div>
);


};

export default InternsTable;
