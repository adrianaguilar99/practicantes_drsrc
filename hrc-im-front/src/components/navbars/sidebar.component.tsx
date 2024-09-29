import { useDispatch, useSelector } from 'react-redux';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import "../components.css";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from '../../redux/store';
import { setIndex, setSidebarOpen } from '../../redux/sidebar-redux/sidebarSlice'; // Importamos la acción para cerrar el sidebar
import { useEffect } from 'react';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import { decryptData } from '../../functions/encrypt-data.function';



export const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userRol = useSelector((state: RootState) => decryptData(state.auth.rol || "") || "");
  const navigate = useNavigate();

  const index = useSelector((state: RootState) => state.sidebar.index);
  const openMenu = useSelector((state: RootState) => state.sidebar.openMenu);
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isSidebarOpen);

  const menuItemsAdmin = [
    { icon: <CottageOutlinedIcon />, label: "Casa", path: "/home" },
    { icon: <PersonOutlineOutlinedIcon />, label: "Encargados", path: "/supervisors" },
    { icon: <CorporateFareOutlinedIcon />, label: "Departamentos", path: "/departments" },
    { icon: <SchoolOutlinedIcon />, label: "Practicantes", path: "/interns" },
    { icon: <DescriptionOutlinedIcon />, label: "Auditorías", path: "/audits" },
  ];

  const menuItemsSupervisor = [
    { icon: <CottageOutlinedIcon />, label: "Casa", path: "/home" },
    { icon: <SchoolOutlinedIcon />, label: "Practicantes", path: "/interns" },
    { icon: <ExitToAppIcon />, label: "Entradas y salidas", path: "/checkin-checkout" },
  ];

  const getMenuItems = () => {
    if (userRol === "ADMINISTRATOR") {
      return menuItemsAdmin;
    } else if (userRol === "SUPERVISOR" || userRol === "SUPERVISOR_RH") {
      return menuItemsSupervisor;
    }
    return [];
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebarElement = document.querySelector('.sidebar');

      // Verifica si el ancho de la pantalla es menor a 768px y si el sidebar está abierto
      if (window.innerWidth < 768 && isSidebarOpen && sidebarElement && !sidebarElement.contains(event.target as Node)) {
        dispatch(setSidebarOpen(false)); // Cerrar el sidebar
      }
    };

    // Añade el event listener para los clics fuera del sidebar
    document.addEventListener('click', handleClickOutside);
    
    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isSidebarOpen, dispatch]);

  return (
    <div className={`sidebar ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`} style={userRol === "INTERN" ? { display: "none" } : {}}>
      {getMenuItems().map((item, idx) => (
        <div
          key={idx}
          className={`menu-item ${index === idx ? "active" : ""}`}
          onClick={() => {
            dispatch(setIndex(idx));
            navigate(item.path);
          }}
        >
          <span className="icon">{item.icon}</span>
          {openMenu && <span className="label">{item.label}</span>}
        </div>
      ))}
    </div>
  );
};
