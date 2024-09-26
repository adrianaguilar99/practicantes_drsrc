import { CheckInCheckOutTable } from "../../components/check-in-check-out/check-in-check-out-tables/check-in-check-out-table.component";
import { Footer } from "../../components/navbars/footer.component";
import { Navbar } from "../../components/navbars/navbar.component";
import { SearchComponent } from "../../components/search/search.component";
import { Breadcrumb } from "../../components/utils/breadcrumb.component";
import "./check-in-check-out.page.css";

const CheckInCheckOutPage = () => {
  return (
    <div className="body-page">
      <Navbar />
      <div className="container-departments">
        <section className="departments-left-container"></section>
        <section className="departments-right-container">
          <Breadcrumb />
          <SearchComponent
            setData={function (data: any): void {
              throw new Error("Function not implemented.");
            }}
          />
          <div className="departments-data-container">
            <CheckInCheckOutTable />
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default CheckInCheckOutPage;
