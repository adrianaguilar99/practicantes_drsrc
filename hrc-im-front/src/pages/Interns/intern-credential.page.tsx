
import { Navbar } from "../../components/navbars/navbar.component"
import { Breadcrumb } from "../../components/utils/breadcrumb.component";
import { Footer } from "../../components/navbars/footer.component";
import { CircularProgress, NothingToSee } from "../../components/utils/circular-progress.component";
import { useEffect, useState } from "react";
import { InternCredentialComponent } from "../../components/interns/interns-components/intern-credential.component";
import { id } from "date-fns/locale";

export const data_intern = {
        name: "LEONARDO DANIEL REBOLLO CALERO",
        id: "b7ba0f09-5a6e-4146-93c2-0c9b934162fe",
        internCode: "386740",
        bloodType: "O+",
        phone: "9988774455",
        address: "Blvd. Kukulcan Km 14, Zona Hotelera, 77500 Cancun, Quintana Roo · 15 km",
        schoolEnrollment: "202100142",
        internshipStart: "2024-10-01",
        internshipEnd: "2025-03-01",
        status: "ACTIVE",
        career: "b7ba0f09-5a6e-4146-93c2-0c9b934162fe",
        department: {
            id: "b7ba0f09-5a6e-4146-93c2-0c9b934162fe",
            name: "Human Resources"
        },
        internshipDepartment: "b7ba0f09-5a6e-4146-93c2-0c9b934162fe",
        institution: {
            id: "b7ba0f09-5a6e-4146-93c2-0c9b934162fe",
            name: "Universidad de Cancun"
        },
        property: "b7ba0f09-5a6e-4146-93c2-0c9b934162fe",
        user: "b7ba0f09-5a6e-4146-93c2-0c9b934162fe"   
}

const InternCredentialPage = () => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true); 
    const [hasError, setHasError] = useState(false);  
    
    useEffect(() => {

        setTimeout(() => {
          try {
            const fetchedData = data_intern;  
              setData(fetchedData);
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
        <div className="container-interns">
          <section className="interns-left-container"></section>
          <section className="interns-right-container">
            <Breadcrumb />
            <div className="interns-data-container">
              {isLoading ? (
                <CircularProgress type="secondary" /> 
              ) : hasError ? (
                <NothingToSee />
              ) : (
                <div className="interns-data">
                  <InternCredentialComponent data={data} />
                </div>
              )}
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
}

export default InternCredentialPage