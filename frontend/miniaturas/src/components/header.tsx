import { Toaster } from "react-hot-toast";
import Logo from "../assets/images/logo.jpg"
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginService from "../services/LoginService";

function Header() {

    const loginService = new LoginService();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [nomeUsuario, setNomeUsuario] = useState("");
    const [iniciais, setIniciais] = useState("");

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        localStorage.removeItem("token");
        navigate(0);
    };

    useEffect(() => {
        loginService.myProfile().then((response) => {
            console.log(response);
            setNomeUsuario(response.data.nome);
            getIniciais();
        });
    
      });
    
    const getIniciais = () => {
        let nomes = nomeUsuario.split(" ");
        setIniciais(nomes[0].substr(0,1)+nomes[1].substr(0,1))
    }


    return (
        <header>
            <Toaster />
            <div className="logo">
                <img src={Logo}/>
                <Tooltip title="Configurações da conta" >
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ mr: 2, float: "right" }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 40, height: 40, bgcolor: "#f3b61a" }}>
                            {iniciais}
                        </Avatar>
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                        },
                    },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={handleClose}>
                        <Avatar /> {nomeUsuario}
                    </MenuItem>
                    <Divider />
                    
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Configurações
                    </MenuItem>
                    <MenuItem onClick={logout}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </div>
        </header>
    );
}

export default Header;