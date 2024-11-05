import { Navbar } from "../../components/navbars/navbar.component";
import LinesLogo from "../../assets/images/lines_logo.png";
import "./home.page.css";
import { SetStateAction, useEffect, useState } from "react";
import { InternViewPage } from "../Interns/intern-view.page";
import { motion } from "framer-motion";
import { Footer } from "../../components/navbars/footer.component";
import { useDispatch, useSelector } from "react-redux";
import { decryptData } from "../../functions/encrypt-data.function";
import { RootState } from "../../redux/store";
import { BarChart, LineChart } from "@mui/x-charts";
import InternsLineChart, {
  ChartData,
} from "../../components/charts/interns-perdate.component";
import { getInternsByDate } from "../../api/charts/charts.api";
import { CircularProgress } from "../../components/utils/circular-progress.component";
import { RetryElement } from "../../components/utils/retry-element.component";
import { setIsLoaded } from "../../redux/auth-redux/authSlice";
import { se } from "date-fns/locale";
import { ButtonComponent } from "../../components/buttons/buttons.component";
import { FormModal } from "../../components/modals/form-modal.component";
import { getInternsCount } from "../../api/interns/interns.api";
import { InternsBarChartDepartment } from "../../components/charts/intern-department-count.component";

const HomePage = () => {
  const dispatch = useDispatch();
  const userRol = useSelector(
    (state: RootState) => decryptData(state.auth.rol || "") || ""
  );
  const userFullName = useSelector(
    (state: RootState) => state.profile.userName
  );
  const loadedRedux = useSelector((state: RootState) => state.auth.isLoaded);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Cambiado a false inicialmente
  const [hasError, setHasError] = useState(false);
  const [internsCount, setInternsCount] = useState(0);
  const userToken = sessionStorage.getItem("_Token") || "";
  const [open, setOpen] = useState(false);
  const Open = () => setOpen(true);
  const Close = () => setOpen(false);
  const [device, setDevice] = useState("desktop");
  const [InternsCompleation, setInternsCompletation] = useState([]);
  const loadData = async () => {
    setIsLoading(true);
    try {
      await getInternsCount(userToken).then((data) => {
        setInternsCount(data.data);
      });
    } catch (error) {}
    try {
      await getInternsByCompletion(userToken).then(
        (data: { data: SetStateAction<never[]> }) => {
          setInternsCompletation(data.data);
        }
      );
    } catch (error) {}
    try {
      const dataByDate = await getInternsByDate(userToken);
      const formattedData = Object.keys(dataByDate)
        .map((date) => ({
          date,
          interns: dataByDate[date],
        }))
        .sort((a, b) => {
          const dateA = new Date(a.date.split("/").reverse().join("-"));
          const dateB = new Date(b.date.split("/").reverse().join("-"));
          return dateA.getTime() - dateB.getTime();
        });

      setChartData(formattedData);
      dispatch(setIsLoaded(true));
    } catch (error) {
      if (userRol !== "INTERN") {
        console.error("Error loading data:", error);
        setHasError(true);
      } else {
        setHasError(false);
        setIsLoading(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [userToken]);

  const pageVariants = {
    initial: { opacity: 0, scale: 0.8 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 0.8 },
  };

  const pageTransition = {
    type: "spring",
    stiffness: 50,
    damping: 20,
  };
  const Click = () => {
    Open();
  };

  const onConfirm = () => {
    Close();
  };

  useEffect(() => {
    const ResizePage = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 1024) {
        setDevice("mobile");
      } else if (screenWidth < 1375) {
        setDevice("laptop");
      } else {
        setDevice("desktop");
      }
    };

    ResizePage();
    window.addEventListener("resize", ResizePage);
    return () => window.removeEventListener("resize", ResizePage);
  }, []);

  return (
    <>
      <div className="body-page">
        {isLoading && !loadedRedux ? (
          <CircularProgress type="loading" />
        ) : hasError ? (
          <RetryElement onClick={() => loadData()} />
        ) : (
          <>
            <Navbar />
            {userRol === "INTERN" ? (
              <InternViewPage />
            ) : (
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                style={{ display: "flex" }}
              >
                <section className="home-left-container"></section>
                <section className="home-right-container">
                  <h2>Bienvenido {userFullName}</h2>

                  <div className="home-data-container">
                    <div
                      style={{
                        display: "flex",
                        gap: "5%",
                      }}
                    >
                      <div className="home-totalinterns-container">
                        <label>Practicantes activos:</label>
                        <p>{internsCount}</p>
                      </div>
                      <div className="home-totalinterns-container">
                        <label>Generar un reporte de los practicantes:</label>
                        <ButtonComponent
                          text="Generar un reporte"
                          onClick={Click}
                          style={{ maxWidth: "200px" }}
                        />
                      </div>
                      <div className="home-totalinternsCompleation-container">
                        <label>Practicantes próximos a finalizar:</label>
                        {InternsCompleation.map((intern, index) => (
                          <p key={index}>{intern}</p>
                         
                        ))}
                      </div>
                    </div>
                    <div className="home-chart-container-body">
                      <div className="home-chart-container">
                        <InternsLineChart
                          chartData={chartData}
                          device={device}
                        />
                      </div>
                      <div className="home-chart-container">
                        <InternsBarChartDepartment device={device} />
                      </div>
                    </div>
                  </div>
                </section>
              </motion.div>
            )}
          </>
        )}
      </div>
      <FormModal
        open={open}
        onConfirm={onConfirm}
        onCancel={Close}
        title="Generar reporte de los practicantes"
        type="Generete"
        entity="report"
      />
      <Footer />
    </>
  );
};

export default HomePage;
function getInternsByCompletion(userToken: string): any {
  throw new Error("Function not implemented.");
}
