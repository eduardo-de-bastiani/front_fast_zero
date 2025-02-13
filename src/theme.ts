import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#512DA8',
    },
    secondary: {
      main: '#00ACC1', // teal
    },
    background: {
      default: '#000000', // Fundo pitch black
      paper: '#000000',
    },
    text: {
      primary: '#ffffff',
      secondary: '#c0c0c0',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#512DA8',
          boxShadow: 'none',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#000000',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          '&:hover': {
            color: '#00ACC1',
          },
          '&.Mui-selected': {
            color: '#00ACC1',
          },
        },
      },
    },
  },
});

export default theme;
