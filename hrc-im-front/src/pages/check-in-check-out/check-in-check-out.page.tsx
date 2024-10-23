import { useEffect, useState } from "react";
import { CheckInCheckOutTable, practicantes } from "../../components/check-in-check-out/check-in-check-out-tables/check-in-check-out-table.component";
import { Footer } from "../../components/navbars/footer.component";
import { Navbar } from "../../components/navbars/navbar.component";
import { SearchComponent } from "../../components/search/search.component";
import { Breadcrumb } from "../../components/utils/breadcrumb.component";
import "./check-in-check-out.page.css";
import { search } from "../../functions/filters-functions";
import { FilterOptions } from "../../components/utils/filters.component";

const CheckInCheckOutPage = () => {
  type CheckInCheckout = {
    id: string;
    nombre: string;
    departamento: string;
    type_check: string;
    tipo: string;
    date: string;
  };

  const [data, setData] = useState<CheckInCheckout[]>([]);
  const [filteredData, setFilteredData] = useState<CheckInCheckout[]>([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [hasError, setHasError] = useState(false);  
  
  const SearchAction = (query: string) => {
    const results = search(data, query, { keys: [ "nombre" , "departamento", "type_check", "tipo", "date"] });
    setFilteredData(results);
  };

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
    console.log("Resultados filtrados:", results); 
    setFilteredData(results); 
  };
  return (
    <div className="body-page">
      <Navbar />
      <div className="container-departments">
        <section className="departments-left-container"></section>
        <section className="departments-right-container">
          <Breadcrumb />
          <SearchComponent onSearch={SearchAction} onFilters={ApplyFilters} />
          <div className="departments-data-container">
            <CheckInCheckOutTable data={filteredData} />
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default CheckInCheckOutPage;
