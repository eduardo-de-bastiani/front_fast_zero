import React from 'react';
import { Container, Box } from '@mui/material';
import Navbar from '../components/navbar';


const TasksList: React.FC = () => {
    return (
      <>
        {/* Navbar com exemplo de usuário */}
        <Navbar username="Username" />
        
        {/* Conteúdo principal dentro de um container */}
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          
        </Container>
      </>
    );
  };

  export default TasksList;