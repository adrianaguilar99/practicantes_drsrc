import { useDispatch, useSelector } from 'react-redux';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import "../components.css";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from '../../redux/store';
import { setIndex, setSubIndex, setSidebarOpen, setInternsDropdownOpen, setUsersDropdownOpen } from '../../redux/sidebar-redux/sidebarSlice';
import { useEffect } from 'react';
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
  const subIndex = useSelector((state: RootState) => state.sidebar.subIndex); // Obtener subIndex del estado
  const openMenu = useSelector((state: RootState) => state.sidebar.openMenu);
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isSidebarOpen);
  const isInternsDropdownOpen = useSelector((state: RootState) => state.sidebar.isInternsDropdownOpen);
  const isUsersDropdownOpen = useSelector((state: RootState) => state.sidebar.isUsersDropdownOpen);

  const menuItemsAdmin: MenuItem[] = [
    { icon: <CottageOutlinedIcon />, label: "Casa", path: "/home" },

    {
      icon: <PersonOutlineOutlinedIcon />,
      label: "Supervisores",
      path: "/supervisors",
      isDropdown: true,
      dropdownItems: [
        { label: "Otros roles", isTitle: true },
        { label: "Administradores", path: "/supervisors/administrators" },
      ],
    },
    {
      icon: <SchoolOutlinedIcon />,
      label: "Practicantes",
      path: "/interns",
      isDropdown: true,
      dropdownItems: [
        
        { label: "Mas informacion", isTitle: true },
        {icon: <ExitToAppIcon />, label: "Entradas y salidas", path: "/interns/checkin-checkout"},
        { label: "Instituciones", path: "/interns/interns-institutions" },
        { label: "Carreras", path: "/interns/interns-careers" },
      ],
    },
      
    { icon: <MapsHomeWorkOutlinedIcon />, label: "Departamentos", path: "/departments" },
    {icon : <ApartmentOutlinedIcon/> , label: "Propiedades", path:"/properties"},
    { icon: <DescriptionOutlinedIcon />, label: "Auditorías", path: "/audits" },
   
  ];

  const menuItemsSupervisorRH: MenuItem[] = [
    { icon: <CottageOutlinedIcon />, label: "Casa", path: "/home" },
    {
      icon: <PersonOutlineOutlinedIcon />,
      label: "Supervisores",
      path: "/supervisors",
    },
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
    {icon: <ExitToAppIcon />, label: "Entradas y salidas", path: "/interns/checkin-checkout"},
      
    { icon: <MapsHomeWorkOutlinedIcon />, label: "Departamentos", path: "/departments" },
    {icon : <ApartmentOutlinedIcon/> , label: "Propiedades", path:"/properties"},
  ];

  const menuItemsSupervisor: MenuItem[] = [
    { icon: <CottageOutlinedIcon />, label: "Casa", path: "/home" },
    {
      icon: <PersonOutlineOutlinedIcon />,
      label: "Supervisores",
      path: "/supervisors",
    },
    {
      icon: <SchoolOutlinedIcon />,
      label: "Mis Practicantes",
      path: "/interns",
    },
    {icon: <ExitToAppIcon />, label: "Entradas y salidas", path: "/interns/checkin-checkout"},
      
  ];

  const getMenuItems = () => {
    if (userRol === "ADMINISTRATOR") {
      return menuItemsAdmin;
    }else if (userRol === "SUPERVISOR") {
      return menuItemsSupervisor;
    }

    return menuItemsSupervisorRH;
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
            className={`menu-item ${index === idx || subIndex !== null && index === idx ? "active" : ""}`}
            onClick={() => {
              dispatch(setIndex(idx));
              dispatch(setSubIndex(null)); 
              navigate(item.path);
            }}
          >
            <span className="icon">{item.icon}</span>
            {openMenu && <span className="label">{item.label}</span>}

            {item.isDropdown && openMenu && (
              <span
                className="dropdown-toggle"
                onClick={(e) => {
                  e.stopPropagation();
                  if (item.label === "Supervisores") {
                    dispatch(setUsersDropdownOpen(!isUsersDropdownOpen));
                  } else {
                    dispatch(setInternsDropdownOpen(!isInternsDropdownOpen));
                  }
                }}
              >
                {(item.label === "Supervisores" && isUsersDropdownOpen) || (item.label === "Practicantes" && isInternsDropdownOpen) ? (
                  <ExpandLessIcon className="dropdown-icon" />
                ) : (
                  <ExpandMoreIcon className="dropdown-icon" />
                )}
              </span>
            )}
          </div>

          {item.isDropdown && ((item.label === "Supervisores" && isUsersDropdownOpen) || (item.label === "Practicantes" && isInternsDropdownOpen)) && (
            <div className={`dropdown-menu open`} style={!isSidebarOpen ? { display: "none" } : {}}>
              {item.dropdownItems?.map((dropdownItem, subIdx) => (
                <div
                  key={subIdx}
                  className={`dropdown-item ${dropdownItem.isTitle ? "dropdown-title" : ""} ${subIndex === subIdx && index === idx ? "active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!dropdownItem.isTitle) {
                      dispatch(setIndex(idx)); 
                      dispatch(setSubIndex(subIdx));
                      navigate(dropdownItem.path);
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
