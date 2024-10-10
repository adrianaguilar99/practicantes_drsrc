import React, { useEffect, useState } from "react";
import { AuditsTable } from "../../components/audits/audits-table.component";
import { Footer } from "../../components/navbars/footer.component";
import { Navbar } from "../../components/navbars/navbar.component";
import { SearchComponent } from "../../components/search/search.component";
import { Breadcrumb } from "../../components/utils/breadcrumb.component";
import { search } from "../../functions/filters-functions";
import './audits.page.css';
import { FilterOptions } from "../../components/utils/filters.component";

const audits = [
    {
      action: "ACTUALIZACIÓN",
      responsable: "JUAN JOSE",
      entity: [
        {
          type: "INTERN",
          name: "LUIS FERNANDO",
          email: "qKpZb@example.com",
          phone: "123456789",
        },
      ],
      date: "2022-01-01",
    },
    {
      action: "INSERCCIÓN",
      responsable: "JUAN JOSE",
      entity: [
        {
          type: "DEPARTMENT",
          name: "FINANZAS",
        },
      ],
      date: "2022-01-01",
    },
    {
      action: "ACTUALIZACIÓN",
      responsable: "JUAN JOSE",
      entity: [
        {
          type: "INTERN",
          name: "MIGUEL ANGEL",
          email: "qKpZb@example.com",
          phone: "123456789",
        },
      ],
      date: "2022-01-01",
    },
    {
      action: "INSERCCIÓN",
      responsable: "JUAN JOSE",
      entity: [
        {
          type: "INTERN",
          name: "YOSHUA RAYMUNDO MORENO ARREDONDO",
          email: "qKpZb@example.com",
          phone: "123456789",
        },
      ],
      date: "2022-01-01",
    },
    {
      action: "ELIMINACIÓN",
      responsable: "ALEXANDER FERNANDO",
      entity: [
        {
          type: "DEPARTMENT",
          name: "FINANZAS",
        },
      ],
      date: "2022-01-01",
    },
  ];
  
const AuditsPage = () => {
    type Audit = {
      action: string;
      responsable: string;
      entity: {
        type: string;
        name: string;
        email?: string;
        phone?: string;
      }[];
      date: string;
      };

      const [data, setData] = React.useState<Audit[]>(audits);
      const [filteredData, setFilteredData] = React.useState<Audit[]>(audits);
      const [isLoading, setIsLoading] = useState(true); 
      const [hasError, setHasError] = useState(false);   
    const SearchAction = (query: string) => {
        const results = search(data, query, { keys: ['action', 'responsable', 'entity', 'date'] });
        setFilteredData(results);
      };


    
      useEffect(() => {

        setTimeout(() => {
          try {
            const fetchedData = audits;  
            if (fetchedData.length > 0) {
              setData(fetchedData);
              setFilteredData(fetchedData);
            } else {
              setHasError(true); 
            }
          } catch (error) {
            setHasError(true);  
          } finally {
            setIsLoading(false);  
          }
        }, 1000); 
      }, []);


    return (
        <div className="body-page">
            <Navbar />
            <div className="container-audits">
            <section className="audits-left-container"></section>
            <section className="audits-right-container">
            <Breadcrumb/>
            <SearchComponent onSearch={SearchAction} onFilters={() => {}}/>
              <div className="audits-data-container">
              <AuditsTable data={filteredData}/>
              </div>
            </section>
              
            </div>
           <Footer />
        </div>
    );
}

export default AuditsPage;