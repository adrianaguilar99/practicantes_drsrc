import { CarrersTable } from "../../components/interns/interns-carrers-table/interns-carrers-table.component";
import { Footer } from "../../components/navbars/footer.component";
import { Navbar } from "../../components/navbars/navbar.component";
import { SearchComponent } from "../../components/search/search.component";
import { Breadcrumb } from "../../components/utils/breadcrumb.component";
import "./interns.page.css";
const InternsCarrersPage = () => {
  function setData(data: any): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="body-page">
      <Navbar />
      <div className="container-interns">
      <section className="interns-left-container"></section>
      <section className="interns-right-container">
        <Breadcrumb />
        <SearchComponent setData={setData} />
        <div className="interns-data-container">
          <CarrersTable />
        </div>
      </section>
      </div>
      <Footer />
    </div>
  );
};

export default InternsCarrersPage;
