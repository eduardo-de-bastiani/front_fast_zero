import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Container } from "@mui/material";

import Navbar from "../components/navbar";
import SideBar from "../components/sidebar";
import { TaskFilters } from "../types/task";

const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [currentFilters, setCurrentFilters] = useState<TaskFilters>({});
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

  const handleApplyFilters = (filters: TaskFilters) => {
    setCurrentFilters(filters);
  };

  const handleResetFilters = () => {
    setCurrentFilters({});
  };


  return (
    <div>
      <Navbar onOpenSideBar={() => setSidebarOpen(true)} username={username} />
      <SideBar
        open={sidebarOpen}
        onOpen={() => setSidebarOpen(true)}
        onClose={() => setSidebarOpen(false)}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
      />

      <Container maxWidth="lg">
        <Outlet context={{ currentFilters }} />
      </Container>
    </div>
  );
};

export default AppLayout;
