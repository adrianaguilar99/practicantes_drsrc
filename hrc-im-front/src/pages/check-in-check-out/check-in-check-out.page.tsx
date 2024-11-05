import { useEffect, useState } from "react";
import { CheckInCheckOutTable} from "../../components/check-in-check-out/check-in-check-out-tables/check-in-check-out-table.component";
import { Footer } from "../../components/navbars/footer.component";
import { Navbar } from "../../components/navbars/navbar.component";
import { SearchComponent } from "../../components/search/search.component";
import { Breadcrumb } from "../../components/utils/breadcrumb.component";
import "./check-in-check-out.page.css";
import { search } from "../../functions/filters-functions";
import { FilterOptions } from "../../components/utils/filters.component";
import { AttendancesInterface, DataAttendance } from "../../interfaces/attendances/attendances.interface";
import { getAttendances } from "../../api/attendances/attendances.api";
import { CircularProgress, NothingToSee } from "../../components/utils/circular-progress.component";
import { RetryElement } from "../../components/utils/retry-element.component";

const CheckInCheckOutPage = () => {
  type CheckInCheckout = {
    id: string;
    nombre: string;
    departamento: string;
    type_check: string;
    tipo: string;
    date: string;
  };

  const [data, setData] = useState<DataAttendance[]>([]);
  const [filteredData, setFilteredData] = useState<DataAttendance[]>([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [hasError, setHasError] = useState(false);
  const userToken = sessionStorage.getItem("_Token") || "";   

  const fetchData = async () => {
    setIsLoading(true);
    try {
        const fetchedData: AttendancesInterface | null = await getAttendances(userToken);
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
    ? +a.intern.user.firstName.localeCompare(b.intern.user.firstName) || +a.intern.user.lastName.localeCompare(b.intern.user.lastName)
    : +b.intern.user.firstName.localeCompare(a.intern.user.firstName) || +b.intern.user.lastName.localeCompare(a.intern.user.lastName)
    );
  }
  if (filters.type) {
    results = results.filter(intern => intern.intern.internshipDepartment.name === filters.type);
  }
  // if (filters.progress) {
  //   if (filters.progress === "Completado") {
  //     results = results.filter(intern => intern.progreso === 100);
  //   }
  // }
  if (Array.isArray(filters.department) && filters.department.length > 0) {
    results = results.filter(intern => filters.department!.includes(intern.intern.internshipDepartment.name));
  }
  console.log("Resultados filtrados:", results); 
  setFilteredData(results); 
};



const SearchAction = (query: string) => {
  const searchData = data.map(intern => ({
    name: intern.intern.user.firstName + " " + intern.intern.user.lastName,
    intershipDepartment: intern.intern.internshipDepartment.name,
  }));
  const results = search(searchData, query, { keys: ['name', 'intershipDepartment' ]  });
  const filteredResults = data.filter(intern =>
    results.some(result => result.name === intern.intern.user.firstName + " " + intern.intern.user.lastName) ||
    results.some(result => result.intershipDepartment === intern.intern.internshipDepartment.name)

  );
  setFilteredData(filteredResults);
};


  return (
    <div className="body-page">
      <Navbar />
      <div className="container-departments">
        <section className="departments-left-container"></section>
        <section className="departments-right-container">
          <Breadcrumb />
          <SearchComponent onSearch={SearchAction} onFilters={ApplyFilters} onAdd={function (): void {
            throw new Error("Function not implemented.");
          } } />
          <div className="departments-data-container">
          {isLoading ? (
              <CircularProgress type="secondary" />
            ) : hasError ? (
               <RetryElement onClick={() => fetchData()}/>
            ) : data.length === 0 ? (
              <NothingToSee />
            ) : (
              <CheckInCheckOutTable data={filteredData} onUpdate={function (): void {
                throw new Error("Function not implemented.");
              } } />
            )}
            
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default CheckInCheckOutPage;
