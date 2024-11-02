import { Navbar } from "../../components/navbars/navbar.component";
import LinesLogo from "../../assets/images/lines_logo.png";
import "./home.page.css";
import { useEffect, useState } from "react";
import { InternViewPage } from "../Interns/intern-view.page";
import { motion } from "framer-motion";
import { Footer } from "../../components/navbars/footer.component";
import { useDispatch, useSelector } from "react-redux";
import { decryptData } from "../../functions/encrypt-data.function";
import { RootState } from "../../redux/store";
import { BarChart, LineChart } from "@mui/x-charts";
import InternsLineChart, { ChartData } from "../../components/charts/interns-perdate.component";
import { getInternsByDate } from "../../api/charts/charts.api";
import { CircularProgress } from "../../components/utils/circular-progress.component";
import { RetryElement } from "../../components/utils/retry-element.component";
import { setIsLoaded } from "../../redux/auth-redux/authSlice";
import { se } from "date-fns/locale";

const HomePage = () => {
  const dispatch = useDispatch();
  const userRol = useSelector(
    (state: RootState) => decryptData(state.auth.rol || "") || ""
  );
  const userFullName = useSelector((state: RootState) => state.profile.userName);
  const loadedRedux = useSelector((state: RootState) => state.auth.isLoaded);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Cambiado a false inicialmente
  const [hasError, setHasError] = useState(false);
  const userToken = sessionStorage.getItem("_Token") || "";

  const loadData = async () => {
    setIsLoading(true); 
    try {
      const dataByDate = await getInternsByDate(userToken);
      const formattedData = Object.keys(dataByDate)
        .map((date) => ({
          date,
          interns: dataByDate[date],
        }))
        .sort((a, b) => {
          const dateA = new Date(a.date.split('/').reverse().join('-'));
          const dateB = new Date(b.date.split('/').reverse().join('-'));
          return dateA.getTime() - dateB.getTime();
        });

      setChartData(formattedData);
      dispatch(setIsLoaded(true)); 
    } catch (error) {
      
      if(userRol !== "INTERN") {
        console.error("Error loading data:", error);
        setHasError(true);
      }else{
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

  return (
    <>
      <div className="body-page">
      {isLoading && !loadedRedux ? (
              <CircularProgress type="loading" />
            ) : hasError ? (
               <RetryElement onClick={() => loadData()}/>
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
                <div className="home-totalinterns-container">
                  <label>Practicantes activos:</label>
                  <p>6</p>
                </div>
                <div className="home-chart-container">
                  <InternsLineChart chartData={chartData}/>
                </div>
                <div className="home-chart-container">
                  <label>Practicantes por departamentos:</label>
                  {/* <TickParamsSelector
                    tickPlacement={tickPlacement}
                    tickLabelPlacement={tickLabelPlacement}
                    setTickPlacement={setTickPlacement}
                    setTickLabelPlacement={setTickLabelPlacement}
                  />
                  <BarChart
                    dataset={dataset}
                    xAxis={[
                      {
                        scaleType: "band",
                        dataKey: "month",
                        tickPlacement,
                        tickLabelPlacement,
                      },
                    ]}
                    {...chartSetting}
                  /> */}
                </div>
                <div className="home-chart-container">
                  <label>Practicantes proximos a terminar:</label>
                  {/* <TickParamsSelector
                    tickPlacement={tickPlacement}
                    tickLabelPlacement={tickLabelPlacement}
                    setTickPlacement={setTickPlacement}
                    setTickLabelPlacement={setTickLabelPlacement}
                  />
                  <BarChart
                    dataset={dataset}
                    xAxis={[
                      {
                        scaleType: "band",
                        dataKey: "month",
                        tickPlacement,
                        tickLabelPlacement,
                      },
                    ]}
                    {...chartSetting}
                  /> */}
                </div>
              </div>
            </section>
          </motion.div>
        )}
              </>
            )}
  
      </div>
      <Footer />
    </>
  );
};

export default HomePage;


