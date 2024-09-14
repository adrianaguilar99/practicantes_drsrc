import { useDispatch, useSelector } from 'react-redux';
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import "../components.css";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from '../../redux/sidebar-redux/store';
import { setIndex } from '../../redux/sidebar-redux/sidebarSlice';
import { useState } from 'react';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';

export const Sidebar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [rol] = useState("Admin");

  const index = useSelector((state: RootState) => state.sidebar.index);
  const openMenu = useSelector((state: RootState) => state.sidebar.openMenu);
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isSidebarOpen);

  const menuItemsAdmin = [
    { icon: <CottageOutlinedIcon />, label: "Casa", path: "/home" },
    { icon: <PersonIcon />, label: "Encargados", path: "/home" },
    { icon: <DeleteIcon />, label: "Departamentos", path: "/departamentos" },
    { icon: <SchoolIcon />, label: "Practicantes", path: "/interns" },
    { icon: <AssignmentIcon />, label: "Auditorías", path: "/auditorias" },
  ];

  const menuItemsSupervisor = [
    { icon: <CottageOutlinedIcon />, label: "Casa", path: "/home" },
    { icon: <SchoolIcon />, label: "Practicantes", path: "/interns" },
    { icon: <ExitToAppIcon />, label: "Entradas y salidas", path: "/entradas-salidas" },
  ];

  const getMenuItems = () => {
    if (rol === "Admin") {
      return menuItemsAdmin;
    } else if (rol === "Supervisor") {
      return menuItemsSupervisor;
    }
    return [];
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
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
