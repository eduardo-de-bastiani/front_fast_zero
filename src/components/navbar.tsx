import React from "react";

import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom"; 
import theme from "../theme";

interface NavbarProps {
  username: string;
  onOpenSideBar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ username, onOpenSideBar }) => {
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
    navigate("/login");
  };

  const handleDeleteAccount = () => {
    handleClose();
    // Lógica para exclusão de conta
    navigate("/delete_account");
  };


  return (
    <Toolbar
      sx={{
        background: theme.palette.grey[800],
        mb: 4,

        display: "grid",
        // três colunas, botão da sidebar, título e botão de perfil
        // garante que o título fica centralizado
        gridTemplateColumns: "1fr 1fr 1fr",
      }}
    >
      {/* Botão para abrir a sidebar, exibido somente se estiver fechada */}
      <IconButton
        sx={{ width: "fit-content" }}
        onClick={onOpenSideBar}
        aria-label="Open Filters"
      >
        <MenuIcon />
      </IconButton>

      <Typography variant="h4" align="center" component="div">
        To-Do's App
      </Typography>

      <div style={{ justifySelf: "end" }}>
        <Button
          color="inherit"
          onClick={handleMenu}
          startIcon={<AccountCircle />}
          sx={{
            textTransform: "none",
            fontSize: "0.875rem",
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
