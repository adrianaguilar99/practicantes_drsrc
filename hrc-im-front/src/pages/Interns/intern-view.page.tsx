import { Link, useNavigate } from "react-router-dom";
import "./interns.page.css";
import LinesLogo from "../../assets/images/lines_logo.png";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import { motion } from "framer-motion";
import { InternChartProgress } from "../../components/charts/intern-chart-progress.component";
import { useEffect, useState } from "react";
import { GetByIDDataInter, GetByIDInternInterface } from "../../interfaces/interns/interns.interface";
import { getInternOwnData } from "../../api/interns/interns.api";
import { getUserId } from "../../functions/auth.function";

export const InternViewPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<GetByIDDataInter | null>(null);
  const customColors = ["#4AAF80", "#C2C2C2"];
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const userToken = sessionStorage.getItem("_Token") || "";
  const internId = getUserId(userToken) || "";


  const fetchData = async () => {
    setIsLoading(true);
    try {
      const fetchedData: GetByIDInternInterface | null = await getInternOwnData(userToken, internId || "");
      if (fetchedData) {
        setData(fetchedData?.data);
        setIsLoading(false);
      }
    }catch (error) {

    }
  };

  useEffect(() => {
    fetchData();
  }, [userToken, internId]);

  
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
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <section className="intern-view-name-container">
        <h1>BIENVENIDO LEONARDO DANIEL REBOLLO CALERO</h1>
      </section>

      <div className="intern-view-container">
        <section className="intern-view-left-container">
          <div className="intern-view-grid-container">
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <motion.div
                className="intern-view-card"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <PersonRoundedIcon sx={{ fontSize: "4.5rem" }} />
                <h3>Mi perfil</h3>
              </motion.div>
            </Link>

            <Link to="/notifications" style={{ textDecoration: "none" }}>
              <motion.div
                className="intern-view-card"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <NotificationsActiveRoundedIcon sx={{ fontSize: "4.5rem" }} />
                <h3>Notificaciones</h3>
              </motion.div>
            </Link>
          </div>
        </section>
        <section className="intern-view-right-container">
          <h2>Mi progreso</h2>
          <div className="intern-view-pie-container">
          <InternChartProgress dataProgress={data?.totalInternshipCompletion || 0}/>
          <img
              className="intern-view-lines-logo"
              src={LinesLogo}
              alt="Lines Logo"
            />
          </div>
        </section>
      </div>
    </motion.div>
  );
};


