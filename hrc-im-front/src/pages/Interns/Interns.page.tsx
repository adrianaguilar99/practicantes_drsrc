import { Navbar } from "../../components/navbars/navbar.component";
import "./interns.page.css";
import { SearchComponent } from "../../components/search/search.component";
import { useEffect, useState } from "react";
import InternsTable, { practicantes } from "../../components/interns/interns-table/interns-table.component";
import { Breadcrumb } from "../../components/utils/breadcrumb.component";
import { Footer } from "../../components/navbars/footer.component";
import { search } from "../../functions/filters-functions";
import { CircularProgress } from "../../components/utils/circular-progress.component";
import { FilterOptions } from "../../components/utils/filters.component";

export const InternsPage = () => {
  type Intern = {
    id: string;
    nombre: string;
    departamento: string;
    progreso: number;
    tipo: string;
  };

  const [data, setData] = useState<Intern[]>([]);
  const [filteredData, setFilteredData] = useState<Intern[]>([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [hasError, setHasError] = useState(false);   

  useEffect(() => {

    setTimeout(() => {
      try {
        const fetchedData = practicantes;  
        if (fetchedData.length > 0) {
          setData(fetchedData);
          setFilteredData(fetchedData);
        } else {
          setHasError(true); 
        }
      } catch (error) {
        setHasError(true);  
      } finally {
        setIsLoading(false);  
      }
    }, 1000); 
  }, []);

  const ApplyFilters = (filters: FilterOptions) => {
    console.log("Aplicando filtros:", filters); 
    let results = [...data];
    if (filters.order) {
      results = results.sort((a, b) =>
        filters.order === "A - Z"
          ? a.nombre.localeCompare(b.nombre)
          : b.nombre.localeCompare(a.nombre)
      );
    }
    if (filters.type) {
      results = results.filter(intern => intern.tipo === filters.type);
    }
    if (filters.progress) {
      if (filters.progress === "Completado") {
        results = results.filter(intern => intern.progreso === 100);
      }
    }
    if (Array.isArray(filters.department) && filters.department.length > 0) {
      results = results.filter(intern => filters.department!.includes(intern.departamento));
    }
    console.log("Resultados filtrados:", results); 
    setFilteredData(results); 
  };
  


  const SearchAction = (query: string) => {
    const results = search(data, query, { keys: ['tipo', 'nombre', 'departamento', 'progreso'] });
    setFilteredData(results);
  };

  return (
    <div className="body-page">
      <Navbar />
      <div className="container-interns">
        <section className="interns-left-container"></section>
        <section className="interns-right-container">
          <Breadcrumb />
          <SearchComponent onSearch={SearchAction} onFilters={ApplyFilters} onAdd={() => {}}/>

          <div className="interns-data-container">
            {isLoading ? (
              <CircularProgress type="secondary" /> 
            ) : hasError ? (
              <div className="no-data-message">
                <p>Ups, parece que no hay nada aquí.</p>  
              </div>
            ) : (
              <InternsTable data={filteredData} /> 
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};
