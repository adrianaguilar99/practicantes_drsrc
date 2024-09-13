// navbar.component.tsx
import { useState } from "react";
import HardRockLogo from "../../assets/images/white_hard_rock_logo.png";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Typography from "@mui/material/Typography";
import { DrawerNav } from "./drawer.component";
import { Badge, Tooltip, Divider} from "@mui/material"; // Importamos el nuevo componente
import { notifications, NotificationsMenu } from "../notifications/notifications.components";

export const Navbar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isNotificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const toggleNotificationMenu = () => {
    setNotificationMenuOpen(prevState => !prevState);
  };
  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
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

          {/* Icono de Notificaciones con menú desplegable */}
          <div className="notifications-container">
          <IconButton color="inherit" onClick={toggleNotificationMenu} >
            <Badge badgeContent={notifications.length} color="error">
              <NotificationsNoneIcon />
            </Badge>
          </IconButton>
          </div>
          

          {/* Menú de Notificaciones como componente separado */}
          
          <NotificationsMenu   anchorEl={isNotificationMenuOpen} />

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
          <IconButton edge="end" onClick={() => toggleDrawer(true)}>
            <Avatar alt="Profile Picture" src="Leonardo.png" />
          </IconButton>
        </Toolbar>
      </AppBar>

      <DrawerNav open={isDrawerOpen} onClose={() => toggleDrawer(false)} />
    </>
  );
};
