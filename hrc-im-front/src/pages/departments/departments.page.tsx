import { useEffect, useState } from "react";
import { DepartmentsTable } from "../../components/departments/departments-table.component";
import { Footer } from "../../components/navbars/footer.component";
import { Navbar } from "../../components/navbars/navbar.component";
import { SearchComponent } from "../../components/search/search.component";
import { Breadcrumb } from "../../components/utils/breadcrumb.component";
import './departments.page.css';
import { FilterOptions } from "../../components/utils/filters.component";
import { search } from "../../functions/filters-functions";
import { departments } from "../../components/utils/testdepartments";

const DepartmentsPage = () => {
  type Department = {
    name: string;
  };

  const [data, setData] = useState<Department[]>([]);
  const [filteredData, setFilteredData] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [hasError, setHasError] = useState(false);   

  useEffect(() => {

    setTimeout(() => {
      try {
        const fetchedData = departments;  
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
    let results = [...data];
    if (filters.order) {
      results = results.sort((a, b) =>
        filters.order === "A - Z"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    }
    setFilteredData(results); 
  };
  


  const SearchAction = (query: string) => {
    const results = search(data, query, { keys: ['name'] });
    setFilteredData(results);
  };

  return (
    <div className="body-page">
      <Navbar />
      <div className="container-departments">
        <section className="departments-left-container"></section>
        <section className="departments-right-container">
          <Breadcrumb/>
          <SearchComponent onSearch={SearchAction} onFilters={ApplyFilters} onAdd={() => {}}/>
           <div className="departments-data-container">
              <DepartmentsTable data={filteredData}/>
           </div>
         
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default DepartmentsPage;
