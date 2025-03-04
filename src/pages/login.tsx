import React, { useState } from "react";
import {InputAdornment, IconButton } from "@mui/material"
import { login } from "../services/loginService";
import { Container, TextField, Button, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import userService from "../services/userService";

const Login: React.FC = () => {
	const [error, setError] = useState<string>("");
	const [success, setSuccess] = useState<boolean>(false);
	const [username, setUsername] = useState<string>("");
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError("");
		setSuccess(false);
		const form = new FormData(event.currentTarget);
		const email = form.get("email");
		const password = form.get("password");

		if (!email || !password) {
			setError("Email and password are required.");
			return;
		}
		try {
			await login(String(email), String(password));			

			setSuccess(true);

			// busca o username
			const user = await userService.getUser();
			if (user) {
				localStorage.setItem("username", user.username); // Salva apenas o username
			}
			setUsername(user.username);

			// navega para a lista de tasks
			navigate("/app");
		} catch (err: unknown) {
			const errorMessage =
				err instanceof Error ? err.message : "Error while authenticating";
			setError(errorMessage);
		}
	};

	const handleClickShowPassword = () => {
		setShowPassword((prev) => !prev);
	};

	return (
		<Container maxWidth="sm" sx={{ mt: 10 }}>
			<Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
				<Button
					variant="outlined"
					startIcon={<ArrowBackIosNewIcon />}
					component={Link}
					to="/"
				>
					Back to Home
				</Button>
			</Box>
			<Typography variant="h4" align="center" gutterBottom>
				Login
			</Typography>
			<Box
				component="form"
				onSubmit={handleLogin}
				sx={{ display: "flex", flexDirection: "column", gap: 2 }}
			>
				<TextField
					label="Email"
					name="email"
					variant="outlined"
					type="email"
					required
				/>
				<TextField
					label="Password"
					name="password"
					variant="outlined"
					type={showPassword ? "text" : "password"}
					required
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
