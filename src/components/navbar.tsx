import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';

interface NavbarProps {
  username: string;
}

const Navbar: React.FC<NavbarProps> = ({username}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" color='primary'>
      <Toolbar variant='dense'>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ToDos' App
        </Typography>
        <div>
        <Button
          color="inherit"
          onClick={handleMenu}
          startIcon={<AccountCircle />}
          sx={{
            textTransform: 'none',
            fontSize: '0.875rem',
          }}
        >
          {username}
        </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Edit Profile</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
            <MenuItem onClick={handleClose}>Delete Account</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 