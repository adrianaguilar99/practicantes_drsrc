import React from "react";
import { ButtonComponent } from "../../components/buttons/button.component";
import LinesLogo from "../../assets/images/lines_logo.png";
import HardRock from "../../assets/images/black_hard_rock_logo.png";
import RCD from "../../assets/images/rcd_logo.png";
import "./login.page.css";

const LoginPage = () => {
    return (
        <div className="container">
            <div className="left-section">
                <img src={HardRock} alt="Hard Rock Logo" />
                <img src={RCD} alt="RCD Logo" />
                <img src={LinesLogo} alt="Lines Logo" />
                <h1>Plataforma de practicantes<br/>Hotel Hard Rock Cancún</h1>
            </div>
            <div className="right-section">
                <h2>Iniciar sesión</h2>
                <ButtonComponent text="Iniciar sesión con Google" />
            </div>
        </div>
    );
};

export default LoginPage;
