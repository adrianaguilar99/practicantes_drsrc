import { useDispatch, useSelector } from 'react-redux';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import "../components.css";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from '../../redux/sidebar-redux/store';
import { setIndex } from '../../redux/sidebar-redux/sidebarSlice';
import { useState } from 'react';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';

interface MenuItem {
  userRol: string;
}
export const Sidebar: React.FC<MenuItem> = ({userRol}) => {
  const dispatch = useDispatch<AppDispatch>();
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
    if (userRol === "Admin") {
      return menuItemsAdmin;
    } else if (userRol === "Supervisor") {
      return menuItemsSupervisor;
    }
    return [];
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`} style={userRol === "Intern" ? { display: "none" } : { display: "block" }}>
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
