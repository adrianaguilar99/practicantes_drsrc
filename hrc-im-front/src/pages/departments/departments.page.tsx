import { useEffect, useState } from "react";
import { DepartmentsTable } from "../../components/departments/departments-table.component";
import { Footer } from "../../components/navbars/footer.component";
import { Navbar } from "../../components/navbars/navbar.component";
import { SearchComponent } from "../../components/search/search.component";
import { Breadcrumb } from "../../components/utils/breadcrumb.component";
import './departments.page.css';
import { FilterOptions } from "../../components/utils/filters.component";
import { search } from "../../functions/filters-functions";
import { DataDepartment, DepartmentsInterface } from "../../interfaces/departments/departments.interface";
import { getDepartmentsData } from "../../api/departments/departments.api";
import { CircularProgress, NothingToSee } from "../../components/utils/circular-progress.component";

const DepartmentsPage = () => {
  type Department = {
    name: string;
  };

  const [data, setData] = useState<DataDepartment[]>([]);
  const [filteredData, setFilteredData] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [hasError, setHasError] = useState(false);   
  const userToken = sessionStorage.getItem("_Token") || "";

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const fetchedData: DepartmentsInterface | null = await getDepartmentsData(userToken);
      if (fetchedData && fetchedData.data.length > 0) {
        setData(fetchedData.data);
        setFilteredData(fetchedData.data);
        setHasError(false); 
      } else if (fetchedData && fetchedData.data.length === 0) {
        setData([]);
        setFilteredData([]);
        setHasError(false);
      } else {
        setHasError(true);
      }
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userToken]);
  
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
    const searchData = data.map(career => ({
      name: career.name,
    }));
    const results = search(searchData, query, { keys: ['name'] });
    const filteredResults = data.filter(career =>
      results.some(result => result.name === career.name)
    );
    setFilteredData(filteredResults);
  };

  const PostSuccess = () => {
    fetchData();

  };


  return (
    <div className="body-page">
      <Navbar />
      <div className="container-departments">
        <section className="departments-left-container"></section>
        <section className="departments-right-container">
          <Breadcrumb/>
          <SearchComponent onSearch={SearchAction} onFilters={ApplyFilters} onAdd={() => PostSuccess()}/>
           <div className="departments-data-container">
           {isLoading ? (
              <CircularProgress type="secondary" />
            ) : hasError ? (
              <button onClick={fetchData}>Reintentar</button>
            ) : data.length === 0 ? (
              <NothingToSee />
            ) : (
              <DepartmentsTable data={filteredData} onUpdate={() => PostSuccess()}/>
            )}
           </div>
         
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default DepartmentsPage;
