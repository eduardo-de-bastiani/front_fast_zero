import React from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';

const Login: React.FC = () => {
    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // Lógica de autenticação aqui (chamada à API, validação, etc.)
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 10 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField 
              label="Email" 
              variant="outlined" 
              type="email" 
              required 
            />
            <TextField 
              label="Senha" 
              variant="outlined" 
              type="password" 
              required 
            />
            <Button variant="contained" type="submit">
              Login
            </Button>
            <Button variant="text" href="/create_account">
              Create an Account
            </Button>
          </Box>
        </Container>
      );
    };
    
    export default Login;