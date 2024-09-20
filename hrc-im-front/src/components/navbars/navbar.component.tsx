import { useDispatch } from 'react-redux';
import HardRockLogo from "../../assets/images/white_hard_rock_logo.png";
import AvatarTest from "../../assets/images/avatar-test.jpg";
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
import { toggleSidebar } from '../../redux/sidebar-redux/sidebarSlice';
import { AppDispatch } from '../../redux/sidebar-redux/store';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import { NavMenu } from '../menus/nav-menu.component';

export const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [userRol, setUserRol] = useState("Supervisor");
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isNotificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const notificationMenuRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); 

  const toggleNotificationMenu = () => {
    setNotificationMenuOpen(prevState => !prevState);
  };

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  const SidebarToggle = () => {
    dispatch(toggleSidebar());
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); 
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null); 
  };

  useEffect(() => {
    const ClickOutside = (event: MouseEvent) => {
      if (notificationMenuRef.current && !notificationMenuRef.current.contains(event.target as Node)) {
        setNotificationMenuOpen(false); 
      }
    };

    if (isNotificationMenuOpen) {
      document.addEventListener("mousedown", ClickOutside);
    } else {
      document.removeEventListener("mousedown", ClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", ClickOutside);
    };
  }, [isNotificationMenuOpen]);

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#2c3e50" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={SidebarToggle}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <img
              src={HardRockLogo}
              alt="Hard Rock Logo"
              style={{ height: "40px", display: "block" }}
            />
          </Typography>

          <div className="notifications-container" ref={notificationMenuRef}>
            <NotificationsMenu anchorEl={isNotificationMenuOpen} />
            <IconButton color="inherit" onClick={toggleNotificationMenu}>
              <Badge badgeContent={notifications().length} color="error">
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>
          </div>

          <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => toggleDrawer(true)}>
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
            <h3 className='user-name-navbar'>Leonardo</h3>
            <IconButton edge="end" onClick={handleOpenUserMenu}>
              <Avatar alt="Profile Picture" src={AvatarTest} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {userRol === "Intern" ? <DrawerNav open={isDrawerOpen} onClose={() => toggleDrawer(false)} /> : null}
      {userRol === "Admin" || userRol === "Supervisor" ? <NavMenu anchorEl={anchorEl} closeUserMenu={handleCloseUserMenu} /> : null}
      <Sidebar />
    </>
  );
};
