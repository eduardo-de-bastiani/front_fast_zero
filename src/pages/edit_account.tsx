import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Box, Typography, IconButton, InputAdornment } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";
import UserService from "../services/userService";

const EditAccount: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  // Busca os dados do usuário quando o componente é montado
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await UserService.getUser();
        setUsername(user.username);
        setEmail(user.email);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Error fetching user data.");
      }
    };
    fetchUserData();
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    
    try {
      // Se o campo de senha estiver vazio, enviamos undefined para não alterar a senha
      const updatedUser = await UserService.updateUser({
        username,
        email,
        password: password.trim() === "" ? undefined : password,
      });
      localStorage.setItem("username", username);
      setSuccess(true);
      
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Network error.";
      setError(errorMessage);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      {/* Botão para voltar à área da aplicação */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIosNewIcon />}
          onClick={() => navigate("/app")}
        >
          Back to Tasks List
        </Button>
      </Box>
      <Typography variant="h4" align="center" gutterBottom>
        Edit Account
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
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
          label="Password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Fill to change password"
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
            Account updated successfully!
          </Typography>
        )}
        <Button variant="contained" type="submit">
          Update Account
        </Button>
      </Box>
    </Container>
  );
};

export default EditAccount;