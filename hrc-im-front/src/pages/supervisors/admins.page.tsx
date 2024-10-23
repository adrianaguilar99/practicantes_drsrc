import { useEffect, useState } from "react";
import { FilterOptions } from "../../components/utils/filters.component";
import { Breadcrumb } from "../../components/utils/breadcrumb.component";
import { Navbar } from "../../components/navbars/navbar.component";
import { SearchComponent } from "../../components/search/search.component";
import { Footer } from "../../components/navbars/footer.component";
import { search } from "../../functions/filters-functions";

const AdminsPage = () => {
    type Admin = {
        name: string;
        department: string;
      };
    
    const [data, setData] = useState<Admin[]>([]);
    const [filteredData, setFilteredData] = useState<Admin[]>([]);
    const [isLoading, setIsLoading] = useState(true); 
    const [hasError, setHasError] = useState(false);   
  

    
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
              
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  };
  
  export default AdminsPage;
  