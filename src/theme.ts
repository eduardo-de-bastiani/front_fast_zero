import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#512DA8', // Roxo mais escuro e forte
    },
    secondary: {
      main: '#00ACC1', // Cor secundária: teal
    },
    background: {
      default: '#000000', // Fundo pitch black
      paper: '#1E1E1E',
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
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#512DA8', // Define o AppBar com o roxo atualizado
          boxShadow: 'none',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#000000', // Fundo do menu permanece pitch black
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          '&:hover': {
            color: '#00ACC1', // Ao passar o mouse, usa a cor secundária (teal)
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
