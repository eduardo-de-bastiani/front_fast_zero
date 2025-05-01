import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { keyframes } from "@emotion/react";

import theme from "../theme";

const gradientFlow = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;


interface NavbarProps {
	username: string;
}

const Navbar: React.FC<NavbarProps> = ({ username }) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const navigate = useNavigate();

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleEditProfile = () => {
		handleClose();
		navigate("/app/edit_account");
	};

	const handleLogout = () => {
		handleClose();
		localStorage.removeItem("token");
		localStorage.removeItem("username");
		navigate("/home");
	};

	const handleDeleteAccount = () => {
		handleClose();
		navigate("/app/delete_account");
	};

	return (
		<Toolbar
      sx={{
        background: `linear-gradient(
          90deg,
          ${theme.palette.primary.main}33 0%,
          ${theme.palette.secondary.main}33 50%,
          ${theme.palette.primary.main}33 100%
        )`,
        mb: 4,
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(81,45,168,0.15)',
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(
            90deg,
            ${theme.palette.primary.main}33 0%,
            ${theme.palette.secondary.main}33 50%,
            ${theme.palette.primary.main}33 100%
          )`,
          animation: `${gradientFlow} 15s ease infinite`,
          zIndex: -1
        }
      }}
    >
      <div /> {/* Espaço vazio à esquerda */}

      <Typography 
        variant="h4" 
        component="div"
        sx={{
          color: '#fff',
          textAlign: 'center',
          position: 'relative',
          textShadow: '0 2px 4px rgba(0,0,0,0.2)',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: -8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60%',
            height: '2px',
            background: `linear-gradient(
              to right,
              transparent,
              ${theme.palette.secondary.main},
              transparent
            )`,
            opacity: 0.7
          }
        }}
      >
        List It
      </Typography>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}>
        {/* Botão de perfil - mantido igual */}
        <Button
          color="inherit"
          onClick={handleMenu}
          startIcon={<AccountCircle />}
          sx={{
            textTransform: 'none',
            fontSize: '0.875rem',
            color: '#fff',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)'
            }
          }}
        >
          {username}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleEditProfile}>Edit Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
          <MenuItem onClick={handleDeleteAccount}>Delete Account</MenuItem>
        </Menu>
      </div>
    </Toolbar>
  );
};

export default Navbar;
