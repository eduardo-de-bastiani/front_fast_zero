import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import Navbar from '../components/navbar';
import SideBar from '../components/sidebar';


const TasksList: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
      <>
        {/* Navbar com exemplo de usuário */}
        <Navbar username="Username" />
        <SideBar
        open={sidebarOpen}
        onOpen={() => setSidebarOpen(true)}
        onClose={() => setSidebarOpen(false)}
        />
        <Container maxWidth="lg" sx={{ mt: 10, ml: sidebarOpen ? '300px' : 0, transition: 'margin 0.3s' }}>
        <Box>
          <h1>Tasks</h1>
        </Box>
        </Container>
      </>
    );
  };

  export default TasksList;