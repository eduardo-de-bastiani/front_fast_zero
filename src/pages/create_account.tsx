import React, { useState } from "react";
import {
	Container,
	TextField,
	Button,
	Box,
	Typography,
	IconButton,
	InputAdornment,
} from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from 'react-router-dom';
import UserService from "../services/user_service";
import { login } from '../services/login_service';

const CreateAccount: React.FC = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		setSuccess(false);

		try {
			const createdUser = await UserService.createAccount(
				username,
				email,
				password,
			);

			console.log("User created:", createdUser);
			setSuccess(true);

      // faz login automatico
      await login(email, password);

      navigate('/app');

		} catch (err: unknown) {
			const errorMessage = err instanceof Error ? err.message : "Network error.";
			setError(errorMessage);
		}
	};

	const handleClickShowPassword = () => {
		setShowPassword((prev) => !prev);
	};

	return (
      <Container maxWidth="sm" sx={{ mt: 10 }}>
      {/* Cabeçalho com botão "Voltar" e título */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          component={Link}
          to="/login"
          variant="outlined"
          startIcon={<ArrowBackIosNewIcon />}
          sx={{ mr: 2 }}
        >
          Back to Login
        </Button>
        <Typography variant="h4" gutterBottom>
          Create Account
        </Typography>
      </Box>
      
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
          type={showPassword ? 'text' : 'password'}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
        {success && (
          <Typography variant="body2" color="primary">
            Account created successfully!
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
