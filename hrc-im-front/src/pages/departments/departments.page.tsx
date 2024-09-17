import { DepartmentsTable } from "../../components/departments-table/departments-table.component";
import { Navbar } from "../../components/navbars/navbar.component";
import { SearchComponent } from "../../components/search/search.component";
import './departments.page.css';

const DepartmentsPage = () => {
  return (
    <div className="body-page">
      <Navbar />
      <div className="container-departments">
        <section className="departments-left-container"></section>
        <section className="departments-right-container">
          <SearchComponent setData={function (data: any): void {
                      throw new Error("Function not implemented.");
                  } }/>
           <div className="departments-data-container">
              <DepartmentsTable />
           </div>
         
        </section>
      </div>
    </div>
  );
};

export default DepartmentsPage;
