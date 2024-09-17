import InternCardComponent from './interns-card.component';
import '../components.css';


const InternsTable = () => {
  const practicantes = [
    { nombre: 'MARTIN MARTINEZ AREAS', departamento: 'TI', progreso: 100, tipo: 'EXTERNO' },
    { nombre: 'LEONARDO DANIEL REBOLLO CALERO', departamento: 'Tecnología de la información', progreso: 43, tipo: 'EXTERNO' },
    { nombre: 'ARMIN BORGES COB', departamento: 'TI', progreso: 100, tipo: 'INTERNO' },
    { nombre: 'CRYSTIAN ADAMIR CARRERA RIVAS', departamento: 'COCINA', progreso: 87, tipo: 'EXTERNO' },
    { nombre: 'YOSHUA RAYMUNDO MORENO ARREDONDO', departamento: 'ENTRETENIMIENTO', progreso: 94, tipo: 'INTERNO' },
    { nombre: 'YOSHUA RAYMUNDO MORENO ARREDONDO', departamento: 'ENTRETENIMIENTO', progreso: 94, tipo: 'INTERNO' },
    { nombre: 'CRYSTIAN ADAMIR CARRERA RIVAS', departamento: 'COCINA', progreso: 87, tipo: 'EXTERNO' },
    { nombre: 'YOSHUA RAYMUNDO MORENO ARREDONDO', departamento: 'ENTRETENIMIENTO', progreso: 94, tipo: 'INTERNO' },
    { nombre: 'CRYSTIAN ADAMIR CARRERA RIVAS', departamento: 'COCINA', progreso: 87, tipo: 'EXTERNO' },
    { nombre: 'CRYSTIAN ADAMIR CARRERA RIVAS', departamento: 'COCINA', progreso: 54, tipo: 'EXTERNO' },
    { nombre: 'CRYSTIAN ADAMIR CARRERA RIVAS', departamento: 'COCINA', progreso: 87, tipo: 'EXTERNO' },
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
  {practicantes.map((practicante, index) => (
    <InternCardComponent
      key={index}
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
