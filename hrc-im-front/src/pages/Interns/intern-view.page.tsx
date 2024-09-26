import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./interns.page.css";
import { Navbar } from "../../components/navbars/navbar.component";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import LinesLogo from "../../assets/images/lines_logo.png";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import PieChartRoundedIcon from "@mui/icons-material/PieChartRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

const InternViewPage = () => {
  const customColors = ["#4AAF80", "#C2C2C2"];

  return (
    <div className="body-page">
      <Navbar />
      <section className="intern-view-name-container">
        <h1>BIENVENIDO LEONARDO DANIEL REBOLLO CALERO</h1>
      </section>

      <div className="intern-view-container">
        <section className="intern-view-left-container">
          <div className="intern-view-grid-container">
            {/* Mi perfil */}

            <Link to="/profile" style={{ textDecoration: "none" }}>
              <div className="intern-view-card">
                <PersonRoundedIcon sx={{ fontSize: "4.5rem" }} />
                <h3>Mi perfil</h3>
              </div>
            </Link>

            {/* Registrar entrada/salida */}
            <Link to="/notifications" style={{ textDecoration: "none" }}>
              <div className="intern-view-card">
                <NotificationsActiveRoundedIcon sx={{ fontSize: "4.5rem" }} />
                <h3>Notificaciones</h3>
              </div>
            </Link>

            {/* Mi progreso */}
            <Link to="/progress" style={{ textDecoration: "none" }}>
              <div className="intern-view-card">
                <PieChartRoundedIcon sx={{ fontSize: "4.5rem" }} />
                <h3>Mi progreso</h3>
              </div>
            </Link>

            {/* Configuración */}
            <Link to="/settings" style={{ textDecoration: "none" }}>
              <div className="intern-view-card">
                <SettingsRoundedIcon sx={{ fontSize: "4.5rem" }} />
                <h3>Configuración</h3>
              </div>
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
                  fill: "white", zIndex: 1
                },
              }}
            />
            <img className="intern-view-lines-logo" src={LinesLogo} alt="Lines Logo" />
          </div>
        </section>
      </div>
    </div>
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

export default InternViewPage;
