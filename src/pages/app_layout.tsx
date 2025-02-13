import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

import Navbar from "../components/navbar";
import SideBar from "../components/sidebar";

const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <Navbar onOpenSideBar={() => setSidebarOpen(true)} username="Username" />
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
