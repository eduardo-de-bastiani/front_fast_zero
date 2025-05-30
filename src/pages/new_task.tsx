import React, { useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import TaskForm from "../components/task_form";
import { useToast } from "../context/toast_context";
import { useNavigate } from "react-router-dom";
import TaskService from "../services/taskService";
import { TaskFormData, Task } from "../types/task";

const NewTask: React.FC = () => {
	const [error, setError] = useState<string>("");
	const [success, setSuccess] = useState<boolean>(false);
	const { showToast } = useToast();
	const navigate = useNavigate();


	const handleSubmit = async (data: TaskFormData) => {
		setError("");
		setSuccess(false);
		try {
			const createdTask: Task = await TaskService.newTask(data);
			showToast(`Task '${createdTask.title}' created sucessfuly.`, 'success')
			setSuccess(true);

			//redireciona para a lista de tarefas
			navigate("/app");
		} catch (err: unknown) {
			const errorMessage =
				err instanceof Error ? err.message : "Error while creating task";
			setError(errorMessage);
			showToast('Error while creating Task.', 'error');
		}
	};

	return (
		<>
			<Container maxWidth="sm" sx={{ mt: 10 }}>
				<Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
					<Button
						variant="outlined"
						startIcon={<ArrowBackIosNewIcon />}
						onClick={() => navigate("/app")}
					>
						Back to Tasks List
					</Button>
				</Box>
				<Typography variant="h4" align="center" gutterBottom>
					New Task
				</Typography>
				{error && <Typography color="error">{error}</Typography>}
				{success && (
					<Typography color="primary">Task created successfully!</Typography>
				)}
				<TaskForm onSubmit={handleSubmit} />
			</Container>
		</>
	);
};

export default NewTask;
