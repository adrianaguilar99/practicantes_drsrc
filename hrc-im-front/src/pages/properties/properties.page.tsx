import { useEffect, useState } from "react";
import { Navbar } from "../../components/navbars/navbar.component";
import { Breadcrumb } from "../../components/utils/breadcrumb.component";
import { CircularProgress, NothingToSee } from "../../components/utils/circular-progress.component";
import { DataProperty, PropertiesInterface } from "../../interfaces/properties/properties.interface";
import { SearchComponent } from "../../components/search/search.component";
import { RetryElement } from "../../components/utils/retry-element.component";
import '../properties/properties.page.css';
import { Footer } from "../../components/navbars/footer.component";
import { getPropertiesData } from "../../api/properties/propertie.api";
import { FilterOptions } from "../../components/utils/filters.component";
import { search } from "../../functions/filters-functions";
import { PropertiesTable } from "../../components/properties/properties-table.component";

const PropertiesPage = () => {
  const [data, setData] = useState<DataProperty[]>([]);
  const [filteredData, setFilteredData] = useState<DataProperty[]>([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [hasError, setHasError] = useState(false);   
  const userToken = sessionStorage.getItem("_Token") || "";
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const fetchedData: PropertiesInterface | null = await getPropertiesData(userToken);
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
    <div className="container-properties">
      <section className="properties-left-container"></section>
      <section className="properties-right-container">
        <Breadcrumb/>
        <SearchComponent onSearch={SearchAction} onFilters={ApplyFilters} onAdd={() => PostSuccess()}/>
         <div className="properties-data-container">
         {isLoading ? (
            <CircularProgress type="secondary" />
          ) : hasError ? (
             <RetryElement onClick={() => fetchData()}/>
          ) : data.length === 0 ? (
            <NothingToSee />
          ) : (
            <PropertiesTable data={filteredData} onUpdate={() => PostSuccess()}/>
          )}
         </div>
       
      </section>
    </div>
    <Footer />
  </div>
  );
}

export default PropertiesPage;