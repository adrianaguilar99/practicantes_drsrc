// NotificationsMenu.tsx
import {
    Menu,
    MenuItem,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Typography,
    IconButton,
    Divider,
    Box,
    Button,
  } from "@mui/material";
  import CheckCircleIcon from "@mui/icons-material/CheckCircle";
  import InfoIcon from "@mui/icons-material/Info";
  import CloseIcon from "@mui/icons-material/Close";
  
  interface NotificationsMenuProps {
    anchorEl: HTMLElement | null;
    onClose: () => void;
  }
  
  export const notifications = [
    {
      type: "ENTRADA",
      date: "05 de septiembre a las 08:55 a. m.",
      icon: <CheckCircleIcon color="success" />,
      color: "green",
    },
    {
      type: "SALIDA",
      date: "05 de septiembre a las 17:00 p. m.",
      icon: <CheckCircleIcon color="success" />,
      color: "green",
    },
    {
      type: "RETARDO",
      date: "06 de septiembre a las 09:45 a. m.",
      icon: <InfoIcon color="warning" />,
      color: "orange",
    },
    {
      type: "SALIDA",
      date: "07 de septiembre a las 17:00 p. m.",
      icon: <CheckCircleIcon color="success" />,
      color: "green",
    },
    {
      type: "ENTRADA",
      date: "08 de septiembre a las 08:55 a. m.",
      icon: <CheckCircleIcon color="success" />,
      color: "green",
    },
  ];
  
  export const NotificationsMenu: React.FC<NotificationsMenuProps> = ({
    anchorEl,
    onClose,
  }) => {
    return (
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
        PaperProps={{
          style: {
            width: "300px",
            borderRadius: "12px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            padding: "10px",
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{ padding: "10px", fontWeight: "bold", textAlign: "center", fontSize: "12px" }}
        >
          Notificaciones
        </Typography>
        <Divider />
  
        {notifications.map((notification, index) => (
          <MenuItem
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ListItem>
              <ListItemText
                primary={
                  <Typography
                    sx={{ color: notification.color, fontWeight: "bold" }}
                  >
                    {notification.type}
                  </Typography>
                }
                secondary={notification.date}
              />
              <ListItemAvatar>{notification.icon}</ListItemAvatar>
            </ListItem>
            <IconButton size="small">
              <CloseIcon fontSize="small" />
            </IconButton>
          </MenuItem>
        ))}
  
        <Box display="flex" justifyContent="center" mt={1}>
          <Button variant="contained" color="primary">
            Ver más
          </Button>
        </Box>
      </Menu>
    );
  };
  