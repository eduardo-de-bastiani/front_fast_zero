import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import TaskService from "../services/taskService";
import { Task } from "../types/task";
import theme from "../theme";

const EditTask: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const fetchedTask = await TaskService.getTask(Number(taskId));
        setTask(fetchedTask);
      } catch (err) {
        console.error("Error fetching task:", err);
        setError("Failed to load task.");
      }
    };
    fetchTask();
  }, [taskId]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!task) return;
    setError("");
    setSuccess(false);

    try {
      const formData = new FormData(e.currentTarget);
      const updatedData = {
        title: String(formData.get("title")),
        description: String(formData.get("description")),
        state: String(formData.get("state")),
      };
      const updatedTask = await TaskService.updateTask(Number(task.id), updatedData);
      setTask(updatedTask);
      setSuccess(true);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Error updating task";
      setError(errorMessage);
    }
  };

  const handleDelete = async () => {
    if (!task) return;
    try {
      await TaskService.deleteTask(Number(task.id));
      navigate("/app");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Error deleting task";
      setError(errorMessage);
    }
  };

  if (!task) return <div>Loading...</div>;

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
          gap: 1,
        }}
      >
        <Typography variant="h4" align="center">
          Edit Task
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ color: theme.palette.primary.main }}
        >
          #{task.id}
        </Typography>
      </Box>
      
      <Box
        component="form"
        onSubmit={handleUpdate}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Title"
          name="title"
          variant="outlined"
          fullWidth
          defaultValue={task.title}
          required
        />
        <TextField
          label="Description"
          name="description"
          variant="outlined"
          fullWidth
          defaultValue={task.description}
          required
        />
        <TextField
          label="State"
          name="state"
          variant="outlined"
          fullWidth
          defaultValue={task.state}
          required
        />
        {error && <Typography color="error">{error}</Typography>}
        {success && (
          <Typography color="primary">
            Task updated successfully!
          </Typography>
        )}
        <Button variant="contained" type="submit">
          Update Task
        </Button>
      </Box>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Delete Task
        </Button>
      </Box>
    </Container>
  );
};

export default EditTask;