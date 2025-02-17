import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import TaskForm from "../components/task_form";
import { useNavigate } from 'react-router-dom';
import TaskService from "../services/TaskService";
import { TaskFormData, Task } from "../types/task";

const NewTask: React.FC = () => {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();



  const handleSubmit = async (data: TaskFormData) => {
    setError('');
    setSuccess(false);
    try{
      console.log("Dados do formulário:", data);
      const createdTask: Task = await TaskService.newTask(data);
      console.log("Tarefa criada com sucesso:", createdTask);
      setSuccess(true);

      //redireciona para a lista de tarefas
      navigate('/app');
    } catch (err: unknown){
      const errorMessage = err instanceof Error ? err.message : 'Error while creating task';
      setError(errorMessage);
    }
    
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h4" align="center" gutterBottom>
        New Task
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="primary">Task created successfully!</Typography>}
      <TaskForm onSubmit={handleSubmit} />
      </Container>
    </>
  );
};

export default NewTask;
