import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "../../components/utils/circular-progress.component";
interface LoadingPageProps {
    type: string;
}
const LoadingPage: React.FC<LoadingPageProps> = ( { type }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
        if(type === "login"){
            navigate("/home");
        }
        else{
            navigate("/");
        }
   
    }, 2000); 
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="body-page">
      <div className="container-loading-page">
        <div className="loading-page">
          <CircularProgress title={type != "login" ? "Cerrando sesión..." : "Cargando..."} />
          
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
