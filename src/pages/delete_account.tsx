// src/pages/DeleteAccount.tsx
import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import { useToast } from "../context/toast_context";
import { useNavigate } from 'react-router-dom';
import UserService from '../services/userService';

const DeleteAccount: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError('');

    try {
      const result = await UserService.deleteUser();

      if (result){
        showToast('Account has been deleted.', 'info');
      }
      
      // Remove token e username do localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      
      // Redireciona para a home
      navigate('/');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error while deleting account';
      setError(errorMessage);
    }
  };

  const handleCancel = () => {
    navigate('/app');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Delete Account
      </Typography>
      <Typography align="center" color="error" sx={{ mb: 2 }}>
        Are you sure you want to delete you account? This action cannot be undone.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete Account
        </Button>
      </Box>
    </Container>
  );
};

export default DeleteAccount;
