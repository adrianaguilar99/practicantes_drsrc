import { Navbar } from "../../components/navbars/navbar.component";
import "./interns.page.css";
import { SearchComponent } from "../../components/search/search.component";
import { useEffect, useState } from "react";
import InternsTable from "../../components/interns/interns-table/interns-table.component";
import { Breadcrumb } from "../../components/utils/breadcrumb.component";
import { Footer } from "../../components/navbars/footer.component";
import { search } from "../../functions/filters-functions";
import { CircularProgress, NothingToSee } from "../../components/utils/circular-progress.component";
import { FilterOptions } from "../../components/utils/filters.component";
import { DataIntern, InternsInterface } from "../../interfaces/interns/interns.interface";
import { getInternsData } from "../../api/interns/interns.api";
import { RetryElement } from "../../components/utils/retry-element.component";

export const InternsPage = () => {


  const [data, setData] = useState<DataIntern[]>([]);
  const [filteredData, setFilteredData] = useState<DataIntern[]>([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [hasError, setHasError] = useState(false);
  const userToken = sessionStorage.getItem("_Token") || "";   

  const fetchData = async () => {
    setIsLoading(true);
    try {
        const fetchedData: InternsInterface | null = await getInternsData(userToken);
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
    console.log("Aplicando filtros:", filters); 
    let results = [...data];
    if (filters.order) {
      results = results.sort((a, b) =>
        filters.order === "A - Z"
      ? +a.user.firstName.localeCompare(b.user.firstName) || +a.user.lastName.localeCompare(b.user.lastName)
      : +b.user.firstName.localeCompare(a.user.firstName) || +b.user.lastName.localeCompare(a.user.lastName)
      );
    }
    if (filters.type) {
      results = results.filter(intern => intern.department === filters.type);
    }
    // if (filters.progress) {
    //   if (filters.progress === "Completado") {
    //     results = results.filter(intern => intern.progreso === 100);
    //   }
    // }
    if (Array.isArray(filters.department) && filters.department.length > 0) {
      results = results.filter(intern => filters.department!.includes(intern.internshipDepartment.name));
    }
    console.log("Resultados filtrados:", results); 
    setFilteredData(results); 
  };
  


  const SearchAction = (query: string) => {
    const searchData = data.map(intern => ({
      name: intern.user.firstName + " " + intern.user.lastName,
      intershipDepartment: intern.internshipDepartment.name,
    }));
    const results = search(searchData, query, { keys: ['name', 'intershipDepartment' ]  });
    const filteredResults = data.filter(intern =>
      results.some(result => result.name === intern.user.firstName + " " + intern.user.lastName) ||
      results.some(result => result.intershipDepartment === intern.internshipDepartment.name)

    );
    setFilteredData(filteredResults);
  };
  const PostSuccess = () => {
    fetchData();
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
               <RetryElement onClick={() => fetchData()}/>
            ) : data.length === 0 ? (
              <NothingToSee />
            ) : (
              <InternsTable data={filteredData} onUpdate={PostSuccess} /> 
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};
