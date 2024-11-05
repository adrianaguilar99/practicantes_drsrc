import { Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { useLogout } from "../../functions/auth.function";
import CircleNotificationsOutlinedIcon from '@mui/icons-material/CircleNotificationsOutlined';
import { useNavigate } from "react-router-dom";

interface NavMenuProps {
    anchorEl: null | HTMLElement;
    closeUserMenu: () => void;
}

export const NavMenu: React.FC<NavMenuProps> = ({ anchorEl, closeUserMenu }) => {
    const navigate = useNavigate();
    const settings = [
        {
            name: "Centro de notificaciones",
            icon: <CircleNotificationsOutlinedIcon />,
        },
        {
            name: "Cerrar sesión",
            icon: <LoginOutlinedIcon />,
        }
    ];

    return (
        <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={closeUserMenu} 
        >
            {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={setting.name === "Cerrar sesión" ? useLogout() : () => navigate("/notifications") }>
                    {setting.icon}
                    <Typography sx={{ textAlign: "center", ml: 1 }}>
                        {setting.name}
                    </Typography>
                </MenuItem>
            ))}
        </Menu>
    );
};
