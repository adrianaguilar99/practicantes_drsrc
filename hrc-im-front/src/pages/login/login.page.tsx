import LinesLogo from "../../assets/images/lines_logo.png";
import HardRock from "../../assets/images/black_hard_rock_logo.png";
import RCDLogo from "../../assets/images/rcd_logo.png";
import "./login.page.css";
import { GoogleButtonComponent } from "../../components/buttons/google_button.component";
import { Footer } from "../../components/navbars/footer.component";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useGetAccessToken } from "../../functions/auth.function";
import { apiUrl, authLogin } from "../../api/api-request";
import { RegisterRow } from "../../components/inputs/register-row.component";
import { ButtonComponent } from "../../components/buttons/buttons.component";
import { InputValidators } from "../../functions/input-validators.functions";

const LoginPage = () => {
  const navigate = useNavigate();
  const getAccessToken = useGetAccessToken();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const GoogleLoginClick = () => {
    window.location.href = apiUrl + "/auth/google/login";
  };

  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({
    userEmail: undefined,
    userPassword: undefined,
  });
  const ValidateInputs = async () => {
    const validators = InputValidators();
    const newErrors: { [key: string]: string | undefined } = {};

    const resultEmail = validators.email(userEmail);
    if (resultEmail) {
      newErrors.userEmail = resultEmail;
    }
    const resultPass = validators.password(password);
    if (resultPass){
      newErrors.userPassword = resultPass;
    }
    setErrors(newErrors);
    if (!newErrors.userEmail && !newErrors.userPassword){
        const response = await authLogin(userEmail, password);
    if (response &&response.status === 404) {
      enqueueSnackbar("Error al iniciar sesión", { variant: "error" });
    }else if (!response) {
      enqueueSnackbar("Credenciales incorrectas", { variant: "error" });    
    }else {
        console.log(response);
      const token = response?.accessToken;
      const refreshToken = response?.refreshToken;
        if (token && refreshToken) {
            sessionStorage.setItem("_Token", token as string);
            sessionStorage.setItem("_refreshToken", refreshToken as string);
            try {
              const tokenData = getAccessToken();
              if (tokenData) {
                enqueueSnackbar("Autenticación exitosa", { variant: "success" });
                navigate("/loading-page-login");
              }
              return;
            } catch (error) {
              console.error("Error al procesar el token:", error);
              enqueueSnackbar("Error al procesar el token", { variant: "error" });
            }
          }
    }
    }
}

  const LoginClick  = async () => {
    ValidateInputs();
    
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const refreshToken = urlParams.get("refreshToken");

    if (token && refreshToken) {
      sessionStorage.setItem("_Token", token as string);
      sessionStorage.setItem("_refreshToken", refreshToken as string);
      try {
        const tokenData = getAccessToken();
        if (tokenData) {
          enqueueSnackbar("Autenticación exitosa", { variant: "success" });
          navigate("/loading-page-login");
        }
        return;
      } catch (error) {
        console.error("Error al procesar el token:", error);
        enqueueSnackbar("Error al procesar el token", { variant: "error" });
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
          <div className="login-form-container">
            <RegisterRow
              label="Correo:"
              onChange={(value) => setUserEmail(value || "")}
              id="email"
              type="text"
              show={true}
              validate={errors.userEmail ? "Error" : "Normal"}
              typeError={errors.userEmail}
            />
            <RegisterRow
              label="Contraseña:"
              onChange={(value) => setPassword(value || "")}
              id="password"
              type="password"
              show={true}
              validate={errors.userPassword ? "Error" : "Normal"}
              typeError={errors.userPassword}
            />

               <ButtonComponent text="Iniciar sesión" onClick={LoginClick} />
          <h5>O iniciar sesion con</h5>
          </div>
     
            

          <GoogleButtonComponent onClick={GoogleLoginClick} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
