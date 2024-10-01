import LinesLogo from "../../assets/images/lines_logo.png";
import HardRock from "../../assets/images/black_hard_rock_logo.png";
import RCDLogo from "../../assets/images/rcd_logo.png";
import "./login.page.css";
import { GoogleButtonComponent } from "../../components/buttons/google_button.component";
import { Footer } from "../../components/navbars/footer.component";
import { useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useGetAccessToken } from "../../functions/auth.function"; // Ajusta la ruta según sea necesario

const LoginPage = () => {
    const navigate = useNavigate();
    const getAccessToken = useGetAccessToken(); // Usa el hook

    const LoginClick = () => {
        window.location.href = 'http://localhost:3000/api/auth/google/login';
    };

    useEffect(() => {
        if(sessionStorage.getItem("_Token")) {
            navigate('/home');
        }
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const refreshToken = urlParams.get('refreshToken');

        if (token && refreshToken) {
            sessionStorage.setItem("_Token", token as string);
            sessionStorage.setItem("_refreshToken", refreshToken as string);
            try {
                const tokenData = getAccessToken(); 
                if (tokenData) {
                    enqueueSnackbar('Autenticación exitosa', { variant: 'success' });
                   navigate('/home');
                }     
                return;
            } catch (error) {
                console.error("Error al procesar el token:", error);
                enqueueSnackbar('Error al procesar el token', { variant: 'error' });
            }
        }
    }, [navigate]);

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
                    <GoogleButtonComponent onClick={LoginClick} />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LoginPage;
