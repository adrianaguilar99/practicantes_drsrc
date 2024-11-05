import { useEffect, useState } from "react";
import { FilterOptions } from "../../components/utils/filters.component";
import { Breadcrumb } from "../../components/utils/breadcrumb.component";
import { Navbar } from "../../components/navbars/navbar.component";
import { SearchComponent } from "../../components/search/search.component";
import { Footer } from "../../components/navbars/footer.component";
import { search } from "../../functions/filters-functions";
import { DataUser, UserInterface } from "../../interfaces/users.interface";
import { getAdminsData } from "../../api/supervisors/admins/admins.api";
import { CircularProgress, NothingToSee } from "../../components/utils/circular-progress.component";
import { RetryElement } from "../../components/utils/retry-element.component";
import { AdminsTable } from "../../components/supervisors/admins-table.component";

const AdminsPage = () => {

    
    const [data, setData] = useState<DataUser[]>([]);
    const [filteredData, setFilteredData] = useState<DataUser[]>([]);
    const [isLoading, setIsLoading] = useState(true); 
  const [hasError, setHasError] = useState(false);   
  const userToken = sessionStorage.getItem("_Token") || "";

  const fetchData = async () => {
    setIsLoading(true);
    try {
        const fetchedData: UserInterface | null = await getAdminsData(userToken);
        if (fetchedData && fetchedData.data.length > 0) {
          setData(fetchedData.data);
          setFilteredData(fetchedData.data);
            setHasError(false); 
        } else {
            setData([]);
            setFilteredData([]);
            setHasError(false);
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
          ? +a.firstName.localeCompare(b.firstName) || +a.lastName.localeCompare(b.lastName)
          : +b.firstName.localeCompare(a.firstName) || +b.lastName.localeCompare(a.lastName)
      );
    }
    setFilteredData(results); 
  };

  
  const SearchAction = (query: string) => {
    const searchData = data.map(supervisor => ({
      name: supervisor.firstName + " " + supervisor.lastName,
    }));
    const results = search(searchData, query, { keys: ['name'] });
    const filteredResults = data.filter(supervisor =>
      results.some(result => result.name === supervisor.firstName + " " + supervisor.lastName)
    );
    setFilteredData(filteredResults);
  };
  const PostSuccess = () => {
    fetchData();
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
            {isLoading ? (
              <CircularProgress type="secondary" />
            ) : hasError ? (
               <RetryElement onClick={() => fetchData()}/>
            ) : data.length === 0 ? (
              <NothingToSee />
            ) : (
              <AdminsTable data={filteredData} onUpdate={() => PostSuccess()}/>
            )}
              
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  };
  
  export default AdminsPage;
  