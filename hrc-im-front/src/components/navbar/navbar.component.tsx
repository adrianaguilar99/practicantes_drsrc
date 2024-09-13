// navbar.component.tsx
import { useState } from "react";
import HardRockLogo from "../../assets/images/white_hard_rock_logo.png";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Typography from "@mui/material/Typography";
import { DrawerNav } from "./drawer.component";
import { Badge, Tooltip, Divider } from "@mui/material"; // Importamos el nuevo componente
import { notifications, NotificationsMenu } from "../notifications/notifications-menu.components";

export const Navbar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Función para abrir el drawer
  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  // Función para abrir el menú de notificaciones
  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Función para cerrar el menú de notificaciones
  const handleNotificationClose = () => {
    setAnchorEl(null);
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

          <Tooltip title="Mensajes" arrow>
            <IconButton color="inherit">
              <Badge badgeContent={3} color="error">
                <MailOutlineIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Icono de Notificaciones con menú desplegable */}
          <IconButton color="inherit" onClick={handleNotificationClick}>
            <Badge badgeContent={notifications.length} color="error">
              <NotificationsNoneIcon />
            </Badge>
          </IconButton>

          {/* Menú de Notificaciones como componente separado */}
          <NotificationsMenu anchorEl={anchorEl} onClose={handleNotificationClose} />

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
