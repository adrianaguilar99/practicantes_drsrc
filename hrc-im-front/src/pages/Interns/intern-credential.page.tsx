
import { Navbar } from "../../components/navbars/navbar.component"
import { Breadcrumb } from "../../components/utils/breadcrumb.component";
import { Footer } from "../../components/navbars/footer.component";
import { CircularProgress, NothingToSee } from "../../components/utils/circular-progress.component";
import { useEffect, useState } from "react";
import { InternCredentialComponent } from "../../components/interns/interns-components/intern-credential.component";
import { ca, id } from "date-fns/locale";
import { GetByIDDataInter, GetByIDInternInterface } from "../../interfaces/interns/interns.interface";
import { useLocation } from "react-router-dom";
import { getInternById } from "../../api/interns/interns.api";
import { getFilesSPLIT } from "../../api/interns/intern-files/intern-files.api";


const InternCredentialPage = () => { 
    const { pathname } = useLocation();
    const uuidMatch = pathname.match(/interns-credentials\/([a-fA-F0-9-]{36})/);
    const internId = uuidMatch ? uuidMatch[1] : null;
    const [data, setData] = useState<GetByIDDataInter>();
    const [isLoading, setIsLoading] = useState(true); 
    const [hasError, setHasError] = useState(false);  
    const [photo, setPhoto] = useState("");
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

  const fetchFiles = async () => {
    const splitPhoto = data?.internFiles?.photo.split("/") ?? [];
    const photoName = splitPhoto[splitPhoto.length - 1] ;
    console.log("Nombre de la foto:", photoName);


    try {
      const photoBlob = await getFilesSPLIT(
        userToken,
        internId || "",
        photoName
      );
      if (photoBlob) {
        const photoUrl = URL.createObjectURL(photoBlob);
        setPhoto(photoUrl);
      } else {
        console.error("No se pudo cargar la foto");
      }

  }catch(error){
    console.error("Error:", error);
  }
}
  
  
    useEffect(() => {
      fetchData();
    }, [userToken]);
    
    useEffect(() => {
      fetchFiles();
    }, [data]);
   

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
                    <InternCredentialComponent data={data} internPhoto={photo} />
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