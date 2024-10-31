import { Navbar } from "../../components/navbars/navbar.component";
import LinesLogo from "../../assets/images/lines_logo.png";
import "./home.page.css";
import { useEffect, useState } from "react";
import { InternViewPage } from "../Interns/intern-view.page";
import { motion } from "framer-motion";
import { Footer } from "../../components/navbars/footer.component";
import { useSelector } from "react-redux";
import { decryptData } from "../../functions/encrypt-data.function";
import { RootState } from "../../redux/store";
import { BarChart, LineChart } from "@mui/x-charts";
import InternsLineChart from "../../components/charts/interns-perdate.component";

const HomePage = () => {
  
  const userRol = useSelector(
    (state: RootState) => decryptData(state.auth.rol || "") || ""
  );
  const [loading, setLoading] = useState(true);
  const userFullName = sessionStorage.getItem("_ProfileName");

  useEffect(() => {
    setLoading(false);
  }, [userFullName]);



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
              {!loading && (
                <h2>Bienvenido {userFullName}</h2>
              )}
              
              <div className="home-data-container">
                <div className="home-totalinterns-container">
                  <label>Practicantes activos:</label>
                  <p>6</p>
                </div>
                <div className="home-chart-container">
                  <InternsLineChart/>
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
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
