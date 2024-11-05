import MyAvatar from "../../assets/images/avatar-test.jpg";
import "./profile.page.css";
import { Navbar } from "../../components/navbars/navbar.component";
import { ProfileData } from "../../components/profile/profile-data.component";
import { ProfileProgress } from "../../components/profile/profile-progress.component";
import { Footer } from "../../components/navbars/footer.component";
import { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { ca } from "date-fns/locale";
import { Avatar } from "@mui/material";
import { DataIntern, GetByIDDataInter, GetByIDInternInterface } from "../../interfaces/interns/interns.interface";
import { getInternOwnData } from "../../api/interns/interns.api";
import { getUserId } from "../../functions/auth.function";
import { CircularProgress} from "../../components/utils/circular-progress.component";
import { RetryElement } from "../../components/utils/retry-element.component";
import { getFilesSPLIT } from "../../api/interns/intern-files/intern-files.api";

const ProfilePage = () => {
  const [option, setOption] = useState(0);
  const [data, setData] = useState<GetByIDDataInter | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [dataInfo, setDataInfo] = useState<DataIntern | null>(null); 
  const [internType, setInternType] = useState("");
  const userToken = sessionStorage.getItem("_Token") || "";
  const internId = getUserId(userToken) || "";

  const [photo, setPhoto] = useState("");
  const [file, setFile] = useState("");
  const [InternPhoto, setInternPhoto] = useState("");
  const [InternFile, setInternFile] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const fetchedData: GetByIDInternInterface | null = await getInternOwnData(userToken, internId || "");

      if (fetchedData) {
        setData(fetchedData?.data);
        setInternType(data?.externalInternCode? "Externo" : "Interno");
        setIsLoading(false);
      }
    }catch (error) {

    }
  };
  
  const fetchFiles = async () => {
    const splitPhoto = InternPhoto.split("/");
    const photoName = splitPhoto[splitPhoto.length - 1];
    console.log("Nombre de la foto:", photoName);
  
    const splitFile = InternFile.split("/");
    const fileName = splitFile[splitFile.length - 1];
    console.log("Nombre del archivo:", fileName);
  
    try {
      const photoBlob = await getFilesSPLIT(userToken, internId || "", photoName);
      if (photoBlob) {
        const photoUrl = URL.createObjectURL(photoBlob);
        setPhoto(photoUrl);
      } else {
        console.error("No se pudo cargar la foto");
      }
  
      const fileBlob = await getFilesSPLIT(userToken, internId || "", fileName);
      if (fileBlob) {
        const fileUrl = URL.createObjectURL(fileBlob);
        setFile(fileUrl);
        console.log("URL del archivo:", fileBlob);
      } else {
        console.error("No se pudo cargar el archivo");
      }
    } catch (error) {
      console.error("Error en fetchFiles:", error);
    }
  };



  useEffect(() => {
    fetchData();
  }, [userToken, internId]);

  return (
    <div className="body-page">
      <Navbar />
      {isLoading ? (
              <CircularProgress type="secondary" />
            ) : hasError ? (
               <RetryElement onClick={() => fetchData()}/>
            ) : (
              <div className="container-profile">
    
          
              <section className="profile-left-container">
                <div style={{ display: "flex", justifyContent: "center" }}>
                <Avatar alt="Remy Sharp" sx={{ width:  200, height: 200 }} src={photo} />
                </div>
            
                <div className="profile-intern-card-img">
              
                 
                </div>
                <div className={`profile-intern-card-info ${internType === "Externo" ? "extern-type" : "intern-type"}`}>
                  <h3>{data ? `${data.user.firstName} ${data.user.lastName}` : "Cargando..."}</h3>
                  {internType === "Externo" ? (
                    <p>Practicante Externo</p>
                  ) : (
                    <p>Practicante Interno</p>
                  )}
                </div>
                <div className="profile-intern-card-options">
                  <p
                    className={`intern-type ${option === 0 ? "active" : "inactive"}`}
                    onClick={() => setOption(0)}
                  >
                    Información
                  </p>
                  <p
                    className={`intern-type ${option === 1 ? "active" : "inactive"}`}
                    onClick={() => setOption(1)}
                  >
                    Mi progreso
                  </p>
                </div>
              </section>
              <section className="profile-right-container">
                <TransitionGroup>
                  <CSSTransition key={option} timeout={300} classNames="fade">
                    {option === 0 ? (
                      data ? <ProfileData data={data} type={internType} /> : <p>Cargando...</p>
                    ) : (
                      <ProfileProgress dataProgress={data?.totalInternshipCompletion || 0} />
                    )}
                  </CSSTransition>
                </TransitionGroup>
              </section>
            </div>
            )}
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
