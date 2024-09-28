import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./interns.page.css";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import LinesLogo from "../../assets/images/lines_logo.png";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import PieChartRoundedIcon from "@mui/icons-material/PieChartRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { motion } from "framer-motion";

export const InternViewPage = () => {
  const navigate = useNavigate(); // Utilizamos para cambiar de vista
  const customColors = ["#4AAF80", "#C2C2C2"];

  // Variantes de animación
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
            {/* Mi perfil */}
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

            {/* Notificaciones */}
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
            <PieChart
              series={[
                {
                  arcLabel: (item) => `${item.value}%`,
                  arcLabelMinAngle: 35,
                  arcLabelRadius: "60%",
                  data: data.data.map((item, index) => ({
                    ...item,
                    color: customColors[index],
                  })),
                },
              ]}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fontWeight: "bold",
                  fill: "white",
                  zIndex: 1,
                },
              }}
            />
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

const data = {
  data: [
    {
      name: "Completado",
      value: 65,
    },
    {
      name: "Pendiente",
      value: 35,
    },
  ],
};
