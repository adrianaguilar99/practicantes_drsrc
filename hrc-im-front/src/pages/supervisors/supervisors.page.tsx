import { useEffect, useState } from "react";
import { Footer } from "../../components/navbars/footer.component";
import { Navbar } from "../../components/navbars/navbar.component";
import { SearchComponent } from "../../components/search/search.component";
import {SupervisorsTable } from "../../components/supervisors/supervisors-table.components";
import { Breadcrumb } from "../../components/utils/breadcrumb.component";
import "./supervisors.page.css";
import { search } from "../../functions/filters-functions";
import { FilterOptions } from "../../components/utils/filters.component";
import { Data } from "../../interfaces/interns/intern-data/intern-data.interface";
import { DataSupervisor, SupervisorInterface } from "../../interfaces/supervisors/supervisor.interface";
import { get } from "http";
import { getSupervisorsData } from "../../api/supervisors/supervisors.api";
import { CircularProgress, NothingToSee } from "../../components/utils/circular-progress.component";
import { RetryElement } from "../../components/utils/retry-element.component";
const SupervisorsPage = () => {

  const [data, setData] = useState<DataSupervisor[]>([]);
  const [filteredData, setFilteredData] = useState<DataSupervisor[]>([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [hasError, setHasError] = useState(false);   
  const userToken = sessionStorage.getItem("_Token") || "";

  const fetchData = async () => {
    setIsLoading(true);
    try {
        const fetchedData: SupervisorInterface | null = await getSupervisorsData(userToken);
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
          ? +a.user.firstName.localeCompare(b.user.firstName) || +a.user.lastName.localeCompare(b.user.lastName)
          : +b.user.firstName.localeCompare(a.user.firstName) || +b.user.lastName.localeCompare(a.user.lastName)
      );
    }
    setFilteredData(results); 
  };

  
  const SearchAction = (query: string) => {
    const searchData = data.map(supervisor => ({
      name: supervisor.user.firstName + " " + supervisor.user.lastName,
    }));
    const results = search(searchData, query, { keys: ['name'] });
    const filteredResults = data.filter(supervisor =>
      results.some(result => result.name === supervisor.user.firstName + " " + supervisor.user.lastName)
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
              <SupervisorsTable data={filteredData} onUpdate={() => PostSuccess()}/>
            )}
          
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default SupervisorsPage;
