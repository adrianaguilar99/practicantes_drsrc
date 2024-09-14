import { useDispatch } from 'react-redux';
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
import { notifications, NotificationsMenu } from "../notifications/notifications.components";
import { Sidebar } from "./sidebar.component";
import { toggleSidebar } from '../../redux/sidebar-redux/sidebarSlice';
import { AppDispatch } from '../../redux/sidebar-redux/store';
import { useState } from 'react';

export const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isNotificationMenuOpen, setNotificationMenuOpen] = useState(false);

  const toggleNotificationMenu = () => {
    setNotificationMenuOpen(prevState => !prevState);
  };

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#2c3e50" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleSidebarToggle}
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

          <div className="notifications-container">
            <NotificationsMenu   anchorEl={isNotificationMenuOpen} />
            <IconButton color="inherit" onClick={toggleNotificationMenu} >
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
            <h3>Leonardo</h3>
            <IconButton edge="end">
              <Avatar alt="Profile Picture" src="Leonardo.png" />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <DrawerNav open={isDrawerOpen} onClose={() => toggleDrawer(false)} />
      <Sidebar  />
    </>
  );
};
