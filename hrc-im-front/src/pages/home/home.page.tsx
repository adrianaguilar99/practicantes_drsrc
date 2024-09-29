import { Navbar } from "../../components/navbars/navbar.component";
import LinesLogo from "../../assets/images/lines_logo.png";
import "./home.page.css";
import { useState } from "react";
import { InternViewPage } from "../Interns/intern-view.page";
import { motion } from "framer-motion";
import { Footer } from "../../components/navbars/footer.component";
import { useSelector } from "react-redux";
import { decryptData } from "../../functions/encrypt-data.function";
import { RootState } from "../../redux/store";

const HomePage = () => {
  const userRol = useSelector((state: RootState) => decryptData(state.auth.rol || "") || "");

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
    >
            <div style={{ width: "70vw" }}></div>
            <div className="home-container">
              <div className="home-text-container"><h1>Bienvenid@</h1></div>
              <div className="home-lines-container">
                <img className="lines-logo" src={LinesLogo} alt="Lines Logo" />
              </div>
              <h2>
                Plataforma de practicantes
                <br />
                Hotel Hard Rock Cancún
              </h2>
            </div>
          </motion.div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
