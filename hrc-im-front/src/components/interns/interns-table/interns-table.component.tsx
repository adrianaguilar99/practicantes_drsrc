import InternCardComponent from './interns-card.component';
import '../../components.css';
import { Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
export const practicantes = [
  { id : "95debf2f-f87d-4363-b310-4833376a8d51", nombre: 'MARTIN MARTINEZ AREAS', departamento: 'TECNOLOGIA DE LA INFORMACION', progreso: 100, tipo: 'EXTERNO' },
  { id : "95debf2f-f87d-4363-b310-4833376a8d52",nombre: 'LEONARDO DANIEL REBOLLO CALERO', departamento: 'TECNOLOGIA DE LA INFORMACION', progreso: 43, tipo: 'EXTERNO' },
  { id : "95debf2f-f87d-4363-b310-4833376a8d53", nombre: 'ARMIN BORGES COB', departamento: 'TECNOLOGIA DE LA INFORMACION', progreso: 100, tipo: 'INTERNO' },
  { id : "95debf2f-f87d-4363-b310-4833376a8d54", nombre: 'CRYSTIAN ADAMIR CARRERA RIVAS', departamento: 'COCINA', progreso: 87, tipo: 'EXTERNO' },
  { id : "95debf2f-f87d-4363-b310-4833376a8d55", nombre: 'YOSHUA RAYMUNDO MORENO ARREDONDO', departamento: 'ENTRETENIMIENTO', progreso: 94, tipo: 'INTERNO' },
  { id : "95debf2f-f87d-4363-b310-4833376a8d56", nombre: 'YOSHUA RAYMUNDO MORENO ARREDONDO', departamento: 'ENTRETENIMIENTO', progreso: 94, tipo: 'INTERNO' },
  { id : "95debf2f-f87d-4363-b310-4833376a8d57", nombre: 'CRYSTIAN ADAMIR CARRERA RIVAS', departamento: 'COCINA', progreso: 87, tipo: 'EXTERNO' },
  { id : "95debf2f-f87d-4363-b310-4833376a8d58", nombre: 'YOSHUA RAYMUNDO MORENO ARREDONDO', departamento: 'ENTRETENIMIENTO', progreso: 94, tipo: 'INTERNO' },
  { id : "95debf2f-f87d-4363-b310-4833376a8d59", nombre: 'CRYSTIAN ADAMIR CARRERA RIVAS', departamento: 'RECEPCION', progreso: 87, tipo: 'EXTERNO' },
  { id : "95debf2f-f87d-4363-b310-4833376a8d60", nombre: 'MANUEL ALEJANDRO FLORES', departamento: 'RECURSOS HUMANOS', progreso: 54, tipo: 'EXTERNO' },
  { id : "95debf2f-f87d-4363-b310-4833376a8d61", nombre: 'JAVIER ALEJANDRO CARRERA RIVAS', departamento: 'RECURSOS HUMANOS', progreso: 87, tipo: 'EXTERNO' },
];

interface InternsTableProps {
  data?: any[];  // Asegúrate de que sea un arreglo de objetos
}

const InternsTable: React.FC<InternsTableProps> = ({ data = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6); 

  useEffect(() => {
    const ResizePage = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 1375) {
        setRowsPerPage(5);
      } else if (screenWidth < 1024) {
        setRowsPerPage(4);
      } else {
        setRowsPerPage(7);
      }
    };

    ResizePage();
    window.addEventListener('resize', ResizePage);
    return () => window.removeEventListener('resize', ResizePage);
  }, []);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const PageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const displayedInterns = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <>
      <div className="table-headers">
        <span>Tipo practicante</span>
        <span>Practicante</span>
        <span>Progreso</span>
        <span>Acciones</span>
      </div>

      <div className="interns-table">
        {displayedInterns.map((intern) => (
          <InternCardComponent
            key={intern.id}
            id={intern.id}
            nombre={intern.nombre}
            departamento={intern.departamento}
            progreso={intern.progreso}
            tipo={intern.tipo as 'INTERNO' | 'EXTERNO'}
            onEdit={() => alert(`Editando a ${intern.nombre}`)}
            onDelete={() => alert(`Eliminando a ${intern.nombre}`)}
          />
        ))}
      </div>

      <div className="table-pagination">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={PageChange}
          variant="outlined"
          shape="rounded"
          size="small"
        />
      </div>
    </>
  );
};

export default InternsTable;
