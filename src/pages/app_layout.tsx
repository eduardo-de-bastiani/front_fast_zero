import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Container } from "@mui/material";

import Navbar from "../components/navbar";
import SideBar from "../components/sidebar";

const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [username, setUsername] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/app"){
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      } else{
        setUsername("Unknown")
      }
    }
  }, [location]);


  return (
    <div>
      <Navbar onOpenSideBar={() => setSidebarOpen(true)} username={username} />
      <SideBar
        open={sidebarOpen}
        onOpen={() => setSidebarOpen(true)}
        onClose={() => setSidebarOpen(false)}
      />

      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </div>
  );
};

export default AppLayout;
