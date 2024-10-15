import { useEffect, useState } from "react";
import { InstitutionsTable, universities } from "../../components/interns/interns-institutions-table/interns-institutions-table.component";
import { Footer } from "../../components/navbars/footer.component";
import { Navbar } from "../../components/navbars/navbar.component";
import { SearchComponent } from "../../components/search/search.component";
import { Breadcrumb } from "../../components/utils/breadcrumb.component";
import { search } from "../../functions/filters-functions";
import "./interns.page.css";
import { FilterOptions } from "../../components/utils/filters.component";
const InternsInstitutionsPage = () => {

  type Universitie = {
    name: string;
    phone: string;
  };
  const [data, setData] = useState<Universitie[]>([]);
  const [filteredData, setFilteredData] = useState<Universitie[]>([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [hasError, setHasError] = useState(false);   

    const SearchAction = (query: string) => {
      const results = search(data, query, { keys: ['name', 'phone'] });
      setFilteredData(results);
    };

    useEffect(() => {

      setTimeout(() => {
        try {
          const fetchedData = universities;  
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
      console.log("Resultados filtrados:", results); 
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
          <InstitutionsTable data={filteredData}/>
        </div>
      </section>
      </div>
      <Footer />
    </div>
  );
};

export default InternsInstitutionsPage;
