
import LinesLogo from "../../assets/images/lines_logo.png";
import HardRock from "../../assets/images/black_hard_rock_logo.png";
import RCDLogo from "../../assets/images/rcd_logo.png";
import "./login.page.css";
import { GoogleButtonComponent } from "../../components/buttons/google_button.component";

const LoginPage = () => {
  return (
    <div className="main-container">
      <div className="logos-container">
          <img className="rcd-logo" src={RCDLogo} alt="RCD Logo" />
          <img className="hard-rock-logo" src={HardRock} alt="Hard Rock Logo" />
        </div>
          <div className="container">
      <div className="left-section">
        

        <div className="lines-logo-container">
        <img className="lines-logo" src={LinesLogo} alt="Lines Logo" />
        </div>
        
        <h1>
          Plataforma de practicantes
          <br />
          Hotel Hard Rock Cancún
        </h1>
      </div>
      <div className="right-section">
        <h2>INICIAR SESIÓN</h2>
        <GoogleButtonComponent />
      </div>
    </div>
    </div>

  );
};

export default LoginPage;
