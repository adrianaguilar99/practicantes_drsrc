import { Box, Divider, Typography, List, ListItem, ListItemIcon, ListItemText, Avatar, ListItemButton } from "@mui/material";
import Drawer from '@mui/material/Drawer';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PieChartIcon from '@mui/icons-material/PieChart';
import SettingsIcon from '@mui/icons-material/Settings';

interface DrawerNavProps {
  open: boolean;
  onClose: () => void;
}

export const DrawerNav = ({ open, onClose }: DrawerNavProps) => {
  return (
    <Drawer
      anchor="right"  
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: '#2c3e50', 
          color: 'white',  
          width: '250px',  
          borderRadius: '20px 0px 0px 20px', 
        },
      }}
    >
      <Box sx={{ padding: '20px', display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ bgcolor: '#f39c12', width: 56, height: 56, marginRight: '10px' }}>
          M
        </Avatar>
        <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>MARTIN AREAS</Typography>
      </Box>

      <List sx={{ paddingTop: '0' }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon sx={{ color: 'white' }}>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary="Notificaciones" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon sx={{ color: 'white' }}>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Mi perfil" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon sx={{ color: 'white' }}>
              <PieChartIcon />
            </ListItemIcon>
            <ListItemText primary="Mi progreso" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon sx={{ color: 'white' }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Configuración" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};
