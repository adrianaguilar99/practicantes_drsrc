import React, { useEffect, useState } from "react";
import { AuditsTable } from "../../components/audits/audits-table.component";
import { Footer } from "../../components/navbars/footer.component";
import { Navbar } from "../../components/navbars/navbar.component";
import { SearchComponent } from "../../components/search/search.component";
import { Breadcrumb } from "../../components/utils/breadcrumb.component";
import { search } from "../../functions/filters-functions";
import './audits.page.css';
import { FilterOptions } from "../../components/utils/filters.component";
import { AuditsInterface } from "../../interfaces/audits/audits.interface";
import { getAuditsData } from "../../api/audits/audits.api";
import { CircularProgress, NothingToSee } from "../../components/utils/circular-progress.component";
import { RetryElement } from "../../components/utils/retry-element.component";

const AuditsPage = () => {
  const [data, setData] = useState<AuditsInterface[]>([]);
const [filteredData, setFilteredData] = useState<AuditsInterface[]>([]);

const [isLoading, setIsLoading] = useState(true);
const [hasError, setHasError] = useState(false);
const userToken = sessionStorage.getItem("_Token") || "";

const fetchData = async () => {
    setIsLoading(true);
    try {
        const fetchedData = await getAuditsData(userToken);
        if (fetchedData) {
            setData(fetchedData);
            setFilteredData(fetchedData);
            setHasError(false);
        } else {
            setData([]);
            setFilteredData([]);
            setHasError(true);
        }
    } catch (error) {
        setHasError(true);
    } finally {
        setIsLoading(false);
    }
};
  

const SearchAction = (query: string) => {
  const searchData = data.map(audit => ({
    ...audit,
    translatedAction: audit.action.split(" ")[0] === "CREATE"
      ? "INSERCCION"
      : audit.action.split(" ")[0] === "UPDATE"
      ? "ACTUALIZACION"
      : "ELIMINACIÓN" 
  }));
  const results = search(searchData, query, { 
    keys: [
      'translatedAction', 
      'responsible.fullName', 
      'entityAffected.name', 
      'auditDate' 
    ] 
  });

  const filteredResults = data.filter(audit =>
    results.some(result => result.id === audit.id)
  );

  setFilteredData(filteredResults);
};
   
      useEffect(() => {
        fetchData();
      }, [userToken]);


      const ApplyFilters = (filters: FilterOptions) => {
    console.log("Aplicando filtros:", filters);
    let results = [...data];
    results = results.map(audit => ({
        ...audit,
        translatedAction: audit.action.split(" ")[0] === "CREATE"
            ? "INSERCION"
            : audit.action.split(" ")[0] === "UPDATE"
            ? "ACTUALIZACION"
            : "ELIMINACION" 
    }));
    if (filters.typeAction && filters.typeAction.length > 0) {
        results = results.filter(audit => 
            filters.typeAction!.some(type => audit.translatedAction === type)
        );
    }
    if (filters.entity && filters.entity.length > 0) {
        results = results.filter(audit => {
            const entityFromAction = audit.action.split(' ').slice(1).join(' ');
            return filters.entity!.includes(entityFromAction) || filters.entity!.includes(audit.entityAffected.name);
        });
    }

    console.log("Resultados filtrados:", results);
    setFilteredData(results);
};

    return (
        <div className="body-page">
            <Navbar />
            <div className="container-audits">
            <section className="audits-left-container"></section>
            <section className="audits-right-container">
            <Breadcrumb/>
            <SearchComponent onSearch={SearchAction} onFilters={ApplyFilters} onAdd={() => {}}/>
              <div className="audits-data-container">
              {isLoading ? (
              <CircularProgress type="secondary" />
            ) : hasError ? (
              <RetryElement onClick={() => fetchData()}/>
            ) : data.length === 0 ? (
              <NothingToSee />
            ) : (
              <AuditsTable  onUpdate={fetchData} data={filteredData}/>
            )}
              
              </div>
            </section>
              
            </div>
           <Footer />
        </div>
    );
}
export default AuditsPage;