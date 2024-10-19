import { useDispatch, useSelector } from 'react-redux';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess'; // Importar el icono para expandir menos
import "../components.css";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from '../../redux/store';
import { setIndex, setSidebarOpen, setInternsDropdownOpen } from '../../redux/sidebar-redux/sidebarSlice'; // Nueva acción
import { useEffect, useState } from 'react';
import { decryptData } from '../../functions/encrypt-data.function';

interface MenuItem {
  icon: JSX.Element;
  label: string;
  path: string;
  isDropdown?: boolean; 
  dropdownItems?: any[];  
}

export const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const userRol = useSelector((state: RootState) => decryptData(state.auth.rol || "") || "");
  const index = useSelector((state: RootState) => state.sidebar.index);
  const openMenu = useSelector((state: RootState) => state.sidebar.openMenu);
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isSidebarOpen);
  const isInternsDropdownOpen = useSelector((state: RootState) => state.sidebar.isInternsDropdownOpen); 

  const menuItemsAdmin: MenuItem[] = [
    { icon: <CottageOutlinedIcon />, label: "Casa", path: "/home" },
    { icon: <PersonOutlineOutlinedIcon />, label: "Usuarios", path: "/supervisors" },
    { icon: <CorporateFareOutlinedIcon />, label: "Departamentos", path: "/departments" },
    {
      icon: <SchoolOutlinedIcon />,
      label: "Practicantes",
      path: "/interns",
      isDropdown: true,  
      dropdownItems: [
        { label: "Opciones Escolares", isTitle: true }, 
        { label: "Instituciones", path: "/interns/interns-institutions" },
        { label: "Carreras", path: "/interns/interns-careers" },
      ],
    },
    { icon: <DescriptionOutlinedIcon />, label: "Auditorías", path: "/audits" },
  ];

  const menuItemsSupervisor: MenuItem[] = [
    { icon: <CottageOutlinedIcon />, label: "Casa", path: "/home" },
    { icon: <CorporateFareOutlinedIcon />, label: "Departamentos", path: "/departments" },
    {
      icon: <SchoolOutlinedIcon />,
      label: "Practicantes",
      path: "/interns",
      isDropdown: true,  
      dropdownItems: [
        { label: "Opciones Escolares", isTitle: true }, 
        { label: "Instituciones", path: "/interns/interns-institutions" },
        { label: "Carreras", path: "/interns/interns-careers" },
      ],
    },
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
      if (window.innerWidth < 768 && isSidebarOpen && sidebarElement && !sidebarElement.contains(event.target as Node)) {
        dispatch(setSidebarOpen(false));
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isSidebarOpen, dispatch]);

  return (
    <div className={`sidebar ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`} style={userRol === "INTERN" ? { display: "none" } : {}}>
  {getMenuItems().map((item, idx) => (
    <div key={idx}>
      <div
        className={`menu-item ${index === idx ? "active" : ""}`}
        onClick={() => {
          dispatch(setIndex(idx));
          navigate(item.path);
        }}
      >
        <span className="icon">{item.icon}</span>
        {openMenu && <span className="label">{item.label}</span>}
        
        {item.isDropdown && openMenu && (
          <span 
            className="dropdown-toggle" 
            onClick={(e) => {
              e.stopPropagation(); // Detiene la propagación del evento para evitar que afecte al menú general
              dispatch(setInternsDropdownOpen(!isInternsDropdownOpen)); // Maneja el despliegue de este menú
            }}
          >
            {isInternsDropdownOpen ? (
              <ExpandLessIcon className="dropdown-icon" />
            ) : (
              <ExpandMoreIcon className="dropdown-icon" />
            )}
          </span>
        )}
      </div>

      {item.isDropdown && isInternsDropdownOpen && (
        <div className={`dropdown-menu open`} style={!isSidebarOpen ? { display: "none" } : {}}>
          {item.dropdownItems?.map((dropdownItem, subIdx) => (
            <div
              key={subIdx}
              className={`dropdown-item ${dropdownItem.isTitle ? "dropdown-title" : ""}`}
              onClick={() => {
                if (!dropdownItem.isTitle) {
                  navigate(dropdownItem.path);
                  dispatch(setIndex(3));
                }
              }}
            >
              {dropdownItem.label}
            </div>
          ))}
        </div>
      )}
    </div>
  ))}
</div>

  );
};
