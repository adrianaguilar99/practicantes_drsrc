import { useEffect, useState } from "react";
import { InstitutionsTable} from "../../components/interns/interns-institutions-table/interns-institutions-table.component";
import { Footer } from "../../components/navbars/footer.component";
import { Navbar } from "../../components/navbars/navbar.component";
import { SearchComponent } from "../../components/search/search.component";
import { Breadcrumb } from "../../components/utils/breadcrumb.component";
import { search } from "../../functions/filters-functions";
import "./interns.page.css";
import { FilterOptions } from "../../components/utils/filters.component";
import { InstitutionsInterface } from "../../interfaces/institutions/institutions.interface";
import { getInstitutionsData } from "../../api/interns/institutions/institutions.api";
import { CircularProgress, NothingToSee } from "../../components/utils/circular-progress.component";
import { RetryElement } from "../../components/utils/retry-element.component";
const InternsInstitutionsPage = () => {

  type Universitie = {
    name: string;
    phone: string;
  };
  const [data, setData] = useState<Universitie[]>([]);
  const [filteredData, setFilteredData] = useState<Universitie[]>([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [hasError, setHasError] = useState(false);   
  const userToken = sessionStorage.getItem("_Token") || "";


    const SearchAction = (query: string) => {
      const results = search(data, query, { keys: ['name', 'phone'] });
      setFilteredData(results);
    };
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedData: InstitutionsInterface | null = await getInstitutionsData(userToken);
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
        <SearchComponent onSearch={SearchAction} onFilters={ApplyFilters} onAdd={() => PostSuccess()}/>
        <div className="interns-data-container">
        {isLoading ? (
              <CircularProgress type="secondary" />
            ) : hasError ? (
              <RetryElement onClick={() => fetchData()}/>
            ) : data.length === 0 ? (
              <NothingToSee />
            ) : (
              <InstitutionsTable data={filteredData} onUpdate={() => PostSuccess()}/>
            )}
          
        </div>
      </section>
      </div>
      <Footer />
    </div>
  );
};

export default InternsInstitutionsPage;
