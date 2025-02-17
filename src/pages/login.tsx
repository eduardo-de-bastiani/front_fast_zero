import React, { useState } from 'react';
import { login } from '../services/LoginService';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();


    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError('');
      setSuccess(false);

      const form = new FormData(event.currentTarget);
      const email = form.get("email");
      const password = form.get("password");

      if (!email || !password) {
        setError("Email and password are required.");
        return;
      }
      try{
        await login(String(email), String(password))
        setSuccess(true);
        navigate('/app');

      } catch (err: unknown){
        const errorMessage = err instanceof Error ? err.message : 'Error while authenticating';
        setError(errorMessage);
    }
  }

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