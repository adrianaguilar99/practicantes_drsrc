import { AuditsTable } from "../../components/audits/audits-table.component";
import { Navbar } from "../../components/navbars/navbar.component";
import { SearchComponent } from "../../components/search/search.component";
import { Breadcrumb } from "../../components/utils/breadcrumb.component";
import './audits.page.css';

const AuditsPage = () => {
    return (
        <div className="body-page">
            <Navbar />
            <div className="container-audits">
            <section className="audits-left-container"></section>
            <section className="audits-right-container">
            <Breadcrumb/>
            <SearchComponent setData={function (data: any): void {
                      throw new Error("Function not implemented.");
                  } }/>
              <div className="audits-data-container">
              <AuditsTable />
              </div>
            </section>
              
            </div>
           
        </div>
    );
}

export default AuditsPage;