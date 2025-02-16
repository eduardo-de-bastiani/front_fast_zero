import React from 'react';
import { login } from '../services/LoginService';
import { Container, TextField, Button, Box, Typography } from '@mui/material';

const Login: React.FC = () => {
    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget)
      const email = String(form.get("email"))
      const password = String(form.get("password"))

      if(email === null || password === null){
        return
      }
      login(email, password)
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 10 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField 
              label="Email" 
              name="email"
              variant="outlined" 
              type="email" 
              required 
            />
            <TextField 
              label="Senha" 
              name ="password"
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