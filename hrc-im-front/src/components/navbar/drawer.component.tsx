// drawer.component.tsx
import { Box, Divider, Typography} from "@mui/material";
import Drawer from '@mui/material/Drawer';

interface DrawerNavProps {
  open: boolean;
  onClose: () => void; // Nueva prop para manejar el cierre
}

export const DrawerNav = ({ open, onClose }: DrawerNavProps) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose} // Usa la prop para cerrar el drawer
      PaperProps={{
        sx: {
          backgroundColor: '#2c3e50',
          color: 'white',
          width: '250px',
          borderRadius: '20px 0 0 20px',
        },
      }}
    >
      <Box sx={{ padding: '20px' }}>
        <Typography variant="h6">Perfil</Typography>
        <Divider sx={{ backgroundColor: 'white', margin: '10px 0' }} />
        <Typography variant="body1">Nombre: Juan Jose</Typography>
        <Typography variant="body1">Email: juan.jose@example.com</Typography>
      </Box>
    </Drawer>
  );
};
