
import { Navbar } from "../../components/navbars/navbar.component";
import "./interns.page.css";
import { SearchComponent } from "../../components/search/search.component";
import { useState } from "react";
import { PokemonInterface } from "../../interfaces/tests/tests.interface";
import InternsTable from "../../components/interns/interns-table.component";
import { Breadcrumb } from "../../components/utils/breadcrumb.component";



export const InternsPage = () => { 
  const [data, setData] = useState<PokemonInterface[]>([]);
  
  return (
    <div className="body-page">
      <Navbar />
      <div className="container-interns">
        <section className="interns-left-container">

        </section>
        <section className="interns-right-container">
         <Breadcrumb/>
         <SearchComponent setData={setData}/>
        <div className="interns-data-container">
         <InternsTable/>
         
        </div>
        
        </section>
        
      </div>
    </div>
  );
};
