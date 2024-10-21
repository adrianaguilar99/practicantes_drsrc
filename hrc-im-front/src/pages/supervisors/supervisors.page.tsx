import { useEffect, useState } from "react";
import { Footer } from "../../components/navbars/footer.component";
import { Navbar } from "../../components/navbars/navbar.component";
import { SearchComponent } from "../../components/search/search.component";
import {SupervisorsTable } from "../../components/supervisors/supervisors-table.components";
import { Breadcrumb } from "../../components/utils/breadcrumb.component";
import "./supervisors.page.css";
import { search } from "../../functions/filters-functions";
import { FilterOptions } from "../../components/utils/filters.component";
export const supervisors = [
  {
      name: "JUAN JOSE",
      department: "RECURSOS HUMANOS",
      phone: "123456789",
      rol: "SUPERVISOR RH",
  },
  { 
      name: "BRIAN WILFRIDO ROMERO CUPUL",
      department: "TECNOLOGIAS DE INFORMACIÓN",
      phone: "99746272",
      rol: "SUPERVISOR",
  },
  {
      name: "MIGUEL ANGEL GARCIA RODRIGUEZ",
      department: "CONTABILIDAD",
      rol: "SUPERVISOR",
      phone: "9983847681",
  },
  {
      name : "ALEXANDER RODRIGUEZ RODRIGUEZ",
      department: "ENTRENAMIENTO",
      rol: "ADMINISTRADOR",
  }
]
const SupervisorsPage = () => {
  type Supervisor = {
    name: string;
    department: string;
  };

  const [data, setData] = useState<Supervisor[]>([]);
  const [filteredData, setFilteredData] = useState<Supervisor[]>([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [hasError, setHasError] = useState(false);   

  useEffect(() => {

    setTimeout(() => {
      try {
        const fetchedData = supervisors;  
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
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    }
    if (Array.isArray(filters.department) && filters.department.length > 0) {
      results = results.filter(intern => filters.department!.includes(intern.department));
    }
    console.log("Resultados filtrados:", results); 
    setFilteredData(results); 
  };
  


  const SearchAction = (query: string) => {
    const results = search(data, query, { keys: ['name', 'department'] });
    setFilteredData(results);
  };

  const PostSuccess = () => {
    // fetchData();

  };
  

  return (
    <div className="body-page">
      <Navbar />
      <div className="container-supervisors">
        <section className="supervisors-left-container"></section>
        <section className="supervisors-right-container">
        <Breadcrumb/>
          <SearchComponent onSearch={SearchAction} onFilters={ApplyFilters} onAdd={() => PostSuccess()}/>
          <div className="supervisors-data-container">
            <SupervisorsTable data={filteredData} onUpdate={() => PostSuccess()}/>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default SupervisorsPage;
