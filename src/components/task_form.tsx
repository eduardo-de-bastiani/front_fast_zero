import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material';

type TaskState = 'draft' | 'todo' | 'doing' | 'done';

interface TaskFormData {
  title: string;
  description?: string;
  state: TaskState;
}

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    state: 'draft'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleStateChange = (e: SelectChangeEvent<TaskState>) => {
    setFormData({
      ...formData,
      state: e.target.value as TaskState
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: 'auto', p: 2 }}>
      <Typography variant="h6" gutterBottom>
        New Task
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          required
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          variant="outlined"
        />
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          variant="outlined"
          multiline
          rows={4}
        />
      </FormControl>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>State</InputLabel>
        <Select
          value={formData.state}
          onChange={handleStateChange}
          label="State"
          name="state"
        >
          <MenuItem value="draft">Draft</MenuItem>
          <MenuItem value="todo">To Do</MenuItem>
          <MenuItem value="doing">Doing</MenuItem>
          <MenuItem value="done">Done</MenuItem>
        </Select>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={!formData.title}
      >
        Create Task
      </Button>
    </Box>
  );
};

export default TaskForm;