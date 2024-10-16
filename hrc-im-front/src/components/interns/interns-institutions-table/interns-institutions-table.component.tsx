import { useEffect, useState } from "react";
import { InstitutionsCard } from "./interns-institutions-card.component"
import { Pagination } from "@mui/material";
import { TableProps } from "../../audits/audits-table.component";

export const universities = [
    {
        name: 'UNIVERSIDAD POLITECNICA DE QUINTANA ROO',
        phone: '1234567890'
    },
    {
        name: 'UNIVERSIDAD DEL CARIBE',
        phone: '1234567890'
    },
    {
        name: 'UNIVERSIDAD AUTONOMA DE BAJA CALIFORNIA',
        phone: '1234567890'
    },
    {
        name: 'UNIVERSIDAD TECNOLOGICA DEL NORTE',
        phone: '1234567890'
    }
]

export const InstitutionsTable : React.FC<TableProps> = ({onUpdate, data = [] }) => {
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
          setRowsPerPage(6);
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
  
  
    const displayedUniversities = data.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );
    return (
        <div>
            <div className="table-headers">
                <span>Nombre de institución</span>
                <span>Teléfono</span>
                <span>Acciones</span>
            </div>
            <div className="interns-institutions-table">
                {
                    displayedUniversities.map((university, index) => (
                        <InstitutionsCard
                            key={index}
                            id={university.id}
                            name={university.name}
                            phone={university.phone}
                            onEdit={() => {}}
                            onDelete={() => {}}
                            onConfirm={onUpdate}
                        />
                    ))
                }
            </div>
            <div className="table-pagination">
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={PageChange}
        variant="outlined"
        shape="rounded"
        size='small'
      />
      </div>
        </div>
    )
}