import { useDispatch, useSelector } from "react-redux";
import HardRockLogo from "../../assets/images/white_hard_rock_logo.png";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Typography from "@mui/material/Typography";
import { DrawerNav } from "./drawer.component";
import { Badge, Divider } from "@mui/material";
import { notifications, NotificationsMenu } from "../notifications/notifications-menu.component";
import { Sidebar } from "./sidebar.component";
import { toggleSidebar, setSidebarOpen } from "../../redux/sidebar-redux/sidebarSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { NavMenu } from "../menus/nav-menu.component";
import { Link } from "react-router-dom";
import { decryptData } from "../../functions/encrypt-data.function";
import { stringAvatar } from "../../functions/utils.functions";
import { getProfileData } from "../../api/api-request";
import { enqueueSnackbar } from "notistack";
import { ProfileInterface } from "../../interfaces/profile.interface";
import { setUserNameRedux } from "../../redux/auth-redux/profileSlice";

export const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userRol = useSelector((state: RootState) => decryptData(state.auth.rol || "") || "");
  const [userName, getProfile] = useGetProfile(sessionStorage.getItem("_Token") || "");
  // const [userRol, setUserRol] = useState<string>("ADMINISTRATOR");
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isNotificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const notificationMenuRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isSidebarOpen);
  
  // Ref para el botón de sidebar
  const sidebarToggleRef = useRef<HTMLButtonElement>(null);

  const toggleNotificationMenu = () => {
    setNotificationMenuOpen((prevState) => !prevState);
  };

  
  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  const SidebarToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevenir que el clic cierre el sidebar
    dispatch(toggleSidebar());
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const MenuValidation = (event: React.MouseEvent<HTMLElement>) => {
    if (userRol === "INTERN") {
      toggleDrawer(true);
    } else {
      handleOpenUserMenu(event);
    }
  };

  
  function useGetProfile(token: string): [string, () => void] {
    const dispatch = useDispatch();
    const userNameRedux = useSelector((state: RootState) => state.profile.userName); 
    const [userName, setUserName] = useState<string>(userNameRedux || ""); 
  
    const getProfile = async () => {
      if (userNameRedux) {
        setUserName(userNameRedux);
        return;
      }
      try {
        const profileData = await getProfileData(token);
        if (profileData) {
          const fullName = `${profileData.data.firstName} ${profileData.data.lastName}`;
          setUserName(fullName);
          dispatch(setUserNameRedux(fullName)); 
        }
      } catch (error) {
        enqueueSnackbar('Error al obtener los datos del perfil', { variant: 'error' });
      }
    };
  
    useEffect(() => {

      if (!userNameRedux) {
        getProfile();
      }
    }, [userNameRedux, token, dispatch]); 
  
    return [userName, getProfile];
  }
  
  
  
  

  
  
  

  useEffect(() => {
    getProfile();
    const handleClickOutside = (event: MouseEvent) => {
      const sidebarElement = document.querySelector('.sidebar');

      if (
        window.innerWidth < 768 &&
        isSidebarOpen &&
        sidebarElement &&
        !sidebarElement.contains(event.target as Node) &&
        sidebarToggleRef.current && 
        !sidebarToggleRef.current.contains(event.target as Node)
      ) {
        dispatch(setSidebarOpen(false));
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isSidebarOpen, , getProfile]);

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#2c3e50", maxHeight: "8.5vh" }}>
        <Toolbar>
          {userRol != "INTERN" ? (
            <IconButton
              ref={sidebarToggleRef} 
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={SidebarToggle} 
            >
              <MenuIcon />
            </IconButton>
          ) : null}

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/home" style={{ textDecoration: "none" }}>
              <img
                src={HardRockLogo}
                alt="Hard Rock Logo"
                style={{ height: "40px", display: "block" }}
              />
            </Link>
          </Typography>

          <div className="notifications-container" ref={notificationMenuRef}>
            <NotificationsMenu anchorEl={isNotificationMenuOpen} />
            <IconButton color="inherit" onClick={toggleNotificationMenu}>
              <Badge badgeContent={notifications().length} color="error">
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>
          </div>

          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={(event) => MenuValidation(event)} // Pasa el evento aquí
          >
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              style={{
                marginRight: "10px",
                borderColor: "white",
                marginLeft: "10px",
              }}
            />
            <h3 className="user-name-navbar">{userName.split(" ")[0]}</h3>
            <IconButton edge="end">
            <Avatar {...stringAvatar(userName)} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {userRol === "INTERN" ? (
        <DrawerNav open={isDrawerOpen} onClose={() => toggleDrawer(false)} />
      ) : null}
      {userRol === "ADMINISTRATOR" || userRol === "SUPERVISOR" ||  userRol === "SUPERVISOR_RH"   ? (
        <NavMenu anchorEl={anchorEl} closeUserMenu={handleCloseUserMenu} />
      ) : null}
      <Sidebar/>
    </>
  );
};
