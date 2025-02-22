import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Container } from "@mui/material";

import Navbar from "../components/navbar";

const AppLayout: React.FC = () => {
	const [username, setUsername] = useState<string>("");
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === "/app") {
			const storedUsername = localStorage.getItem("username");
			if (storedUsername) {
				setUsername(storedUsername);
			} else {
				setUsername("Unknown");
			}
		}
	}, [location]);

	return (
		<div>
			<Navbar username={username} />

			<Container maxWidth="lg">
				<Outlet />
			</Container>
		</div>
	);
};

export default AppLayout;
