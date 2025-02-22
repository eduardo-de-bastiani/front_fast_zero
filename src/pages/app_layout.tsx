import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Container } from "@mui/material";

import Navbar from "../components/navbar";

const AppLayout: React.FC = () => {
	const [username, setUsername] = useState<string>("");
	const location = useLocation();
	const navigate = useNavigate();


	useEffect(() => {
		const token = localStorage.getItem("token");
    	const storedUsername = localStorage.getItem("username");

		if (!token) {
		navigate("/login");
		return;
		}

		if (location.pathname === "/app") {
		setUsername(storedUsername || "Unknown");
		}
  }, [location, navigate]);

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
