import { Navbar } from "../../components/navbars/navbar.component";
import LinesLogo from "../../assets/images/lines_logo.png";
import "./home.page.css";

const HomePage = () => {
  return (
    <>
      <div className="body-page">
        <Navbar />
        <div style={{ width: "70vw" }}></div>
        <div className="home-container">
        
        <div className="home-text-container"><h1>Bienvenid@ a la</h1></div>
        
        <div className="home-lines-container">
        <img className="lines-logo" src={LinesLogo} alt="Lines Logo" />
        </div>
        
        <h2>
          Plataforma de practicantes
          <br />
          Hotel Hard Rock Cancún
        </h2>
      </div>
      </div>
    </>
  );
};

export default HomePage;
