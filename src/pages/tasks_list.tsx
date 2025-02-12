import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import Navbar from '../components/navbar';
import SideBar from '../components/sidebar';
import ToggleSidebarButton from '../components/ToggleSideBarButton';

const TasksList: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarWidth = 300;

  const handleToggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

    return (
      <>
        {/* Navbar com exemplo de usuário */}
        <Navbar username="Username" />
        <SideBar
        open={sidebarOpen}
        onOpen={() => setSidebarOpen(true)}
        onClose={() => setSidebarOpen(false)}
        />

        {/* Botão de toggle fixado no lado esquerdo */}
        <ToggleSidebarButton 
        open={sidebarOpen} 
        onToggle={handleToggleSidebar} 
        sidebarWidth={sidebarWidth} />

        <Container maxWidth="lg"
        sx={{ 
          mt: 10, 
          ml: sidebarOpen ? `${sidebarWidth}px` : 0, 
          transition: 'margin-left 0.3s'
        }}
        >
        <Box>
          <h1>Tasks</h1>
        </Box>
        </Container>
      </>
    );
  };

  export default TasksList;