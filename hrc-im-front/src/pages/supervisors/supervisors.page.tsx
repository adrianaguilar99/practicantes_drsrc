import { Navbar } from "../../components/navbars/navbar.component";
import { SearchComponent } from "../../components/search/search.component";
import { SupervisorsTable } from "../../components/supervisors/supervisors-table.components";
import { Breadcrumb } from "../../components/utils/breadcrumb.component";
import "./supervisors.page.css";

const SupervisorsPage = () => {
    function setData(data: any): void {
        throw new Error("Function not implemented.");
    }

  return (
    <div className="body-page">
      <Navbar />
      <div className="container-supervisors">
        <section className="supervisors-left-container"></section>
        <section className="supervisors-right-container">
        <Breadcrumb/>
          <SearchComponent setData={setData} />
          <div className="supervisors-data-container">
            <SupervisorsTable />
          </div>
        </section>
      </div>
    </div>
  );
};

export default SupervisorsPage;
