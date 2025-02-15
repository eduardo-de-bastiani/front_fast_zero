import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';

const CreateAccount: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    
    try {
      const response = await fetch('/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      
      if (response.ok) {
        setSuccess(true);
        // Limpar os campos se necessário:
        setUsername('');
        setEmail('');
        setPassword('');
      } else {
        const data = await response.json();
        setError(data.detail || 'Error while creating account.');
      }
    } catch (err) {
      setError('Erro de rede.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Create Account
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <TextField
          label="Username"
          variant="outlined"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Senha"
          variant="outlined"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
        {success && (
          <Typography variant="body2" color="primary">
            Account created Successfully!
          </Typography>
        )}
        <Button variant="contained" type="submit">
          Create Account
        </Button>
      </Box>
    </Container>
  );
};

export default CreateAccount;