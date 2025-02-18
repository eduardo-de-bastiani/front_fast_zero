import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

import Navbar from "../components/navbar";
import SideBar from "../components/sidebar";

const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    else{
      setUsername("Unknown");
    }
  }, []);

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
