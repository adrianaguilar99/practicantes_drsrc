import { useEffect, useState } from "react";
import { CareersTable } from "../../components/interns/interns-careers-table/interns-careers-table.component";
import { Footer } from "../../components/navbars/footer.component";
import { Navbar } from "../../components/navbars/navbar.component";
import { SearchComponent } from "../../components/search/search.component";
import { Breadcrumb } from "../../components/utils/breadcrumb.component";
import "./interns.page.css";
import { search } from "../../functions/filters-functions";
import { FilterOptions } from "../../components/utils/filters.component";
import { CareersInterface, DataCareer } from "../../interfaces/careers/careers.intarface";
import { CircularProgress, NothingToSee } from "../../components/utils/circular-progress.component";
import { enqueueSnackbar } from "notistack";
import { getCareersData } from "../../api/interns/careers/careers.api";

const InternsCareersPage = () => {
  const [data, setData] = useState<DataCareer[]>([]);
  const [filteredData, setFilteredData] = useState<DataCareer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const userToken = sessionStorage.getItem("_Token") || "";

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const fetchedData: CareersInterface | null = await getCareersData(userToken);
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
              <button onClick={fetchData}>Reintentar</button>
            ) : data.length === 0 ? (
              <NothingToSee />
            ) : (
              <CareersTable data={filteredData} onUpdate={() => PostSuccess()}/>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default InternsCareersPage;
