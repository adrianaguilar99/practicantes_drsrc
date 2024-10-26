
import { Navbar } from "../../components/navbars/navbar.component"
import { Breadcrumb } from "../../components/utils/breadcrumb.component";
import { Footer } from "../../components/navbars/footer.component";
import { CircularProgress, NothingToSee } from "../../components/utils/circular-progress.component";
import { useEffect, useState } from "react";
import { InternCredentialComponent } from "../../components/interns/interns-components/intern-credential.component";
import { id } from "date-fns/locale";
import { GetByIDDataInter, GetByIDInternInterface } from "../../interfaces/interns/interns.interface";
import { useLocation } from "react-router-dom";
import { getInternById } from "../../api/interns/interns.api";


const InternCredentialPage = () => { 
    const { pathname } = useLocation();
    const uuidMatch = pathname.match(/interns-credentials\/([a-fA-F0-9-]{36})/);
    const internId = uuidMatch ? uuidMatch[1] : null;
    const [data, setData] = useState<GetByIDDataInter>();
    const [isLoading, setIsLoading] = useState(true); 
    const [hasError, setHasError] = useState(false);  
    const userToken = sessionStorage.getItem("_Token") || "";

    const fetchData = async () => {
      setIsLoading(true);
      try {
          const fetchedData: GetByIDInternInterface | null = await getInternById(
            userToken,
            internId || ""
          );
          if (fetchedData) {
              setData(fetchedData.data);
              console.log(fetchedData.data);
              setHasError(false); 
          } else {
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
                  {data && (
                    <InternCredentialComponent data={data} />
                  )}
                  
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