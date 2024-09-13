import { useNavigate } from 'react-router-dom';
import '../components.css';

export const GoogleButtonComponent = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulación de autenticación y luego redirección
    navigate('/home');
  };

  return (
    <button className="google-btn" onClick={handleLogin}>
      <img
        src="https://w7.pngwing.com/pngs/326/85/png-transparent-google-logo-google-text-trademark-logo-thumbnail.png"
        alt="Google icon"
        className="google-icon"
      />
      Continuar con Google
    </button>
  );
};
