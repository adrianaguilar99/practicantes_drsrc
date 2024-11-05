import { useDispatch, useSelector } from "react-redux";
import HardRockLogo from "../../assets/images/white_hard_rock_logo.png";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Typography from "@mui/material/Typography";
import { Badge, Divider } from "@mui/material";
import {  NotificationsMenu } from "../notifications/notifications-menu.component";
import { Sidebar } from "./sidebar.component";
import { toggleSidebar, setSidebarOpen } from "../../redux/sidebar-redux/sidebarSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { NavMenu } from "../menus/nav-menu.component";
import RCD_LOGO from "../../assets/images/rcd_logo_white.png";
import { Link } from "react-router-dom";
import { decryptData } from "../../functions/encrypt-data.function";
import { stringAvatar } from "../../functions/utils.functions";
import { getProfileData } from "../../api/api-request";
import { enqueueSnackbar } from "notistack";
import { styled } from '@mui/material/styles';
import { setUserNameRedux } from "../../redux/auth-redux/profileSlice";

export const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userRol = useSelector((state: RootState) => decryptData(state.auth.rol || "") || "");
  const [userName, getProfile] = useGetProfile(sessionStorage.getItem("_Token") || "");
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isNotificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const notificationMenuRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const notificationsLength = useSelector((state: RootState) => state.profile.notificationsLength) || 0;
  
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isSidebarOpen);
  const sidebarToggleRef = useRef<HTMLButtonElement>(null);

  const toggleNotificationMenu = () => {
    setNotificationMenuOpen((prevState) => !prevState);
  };

  
  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  const SidebarToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); 
    dispatch(toggleSidebar());
  };

  const OpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const CloseUserMenu = () => {
    setAnchorEl(null);
  };

  const MenuValidation = (event: React.MouseEvent<HTMLElement>) => {
      OpenUserMenu(event);
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));
  
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

          <Typography variant="h6" sx={{ flexGrow: 1,display: "flex", alignItems: "center" ,gap: "10px"}}>
             <img
                src={RCD_LOGO}
                alt="RCD HOTELS LOGO"
                style={{ height: "40px", display: "block" }}
                onClick={() => window.location.pathname = "/home"}
              />
              <img
                src={HardRockLogo}
                alt="Hard Rock Logo"
                style={{ height: "40px", display: "block" }}
                onClick={() => window.location.pathname = "/home"}
              />
          </Typography>
          <div className="nav-rol-display" style={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "center", fontFamily: "Lato" }}>
               <span className="nav-rol">{userRol === "ADMINISTRATOR" ? "Admin RCD" : userRol + " RCD"}</span>
          </div>

          <div className="notifications-container" ref={notificationMenuRef}>
            <NotificationsMenu anchorEl={isNotificationMenuOpen} />
            <IconButton color="inherit" onClick={toggleNotificationMenu}>
              <Badge badgeContent={notificationsLength} color="error">
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>
          </div>

          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={(event) => MenuValidation(event)} 
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
            <StyledBadge
  overlap="circular"
  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
  variant="dot"
>
            <Avatar {...stringAvatar(userName)} />
</StyledBadge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

        <NavMenu anchorEl={anchorEl} closeUserMenu={CloseUserMenu} />
      <Sidebar/>
    </>
  );
};
