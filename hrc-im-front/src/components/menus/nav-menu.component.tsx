import { Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { useLogout } from "../../functions/auth.function";

interface NavMenuProps {
    anchorEl: null | HTMLElement;
    closeUserMenu: () => void;
}

export const NavMenu: React.FC<NavMenuProps> = ({ anchorEl, closeUserMenu }) => {
    const settings = [
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
                <MenuItem key={setting.name} onClick={useLogout()}>
                    {setting.icon}
                    <Typography sx={{ textAlign: "center", ml: 1 }}>
                        {setting.name}
                    </Typography>
                </MenuItem>
            ))}
        </Menu>
    );
};
