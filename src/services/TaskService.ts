import { Task } from "../types/task";

class TaskService {
  async listTasks(): Promise<Task[]> {
    return [
      {
        title: "Task 1",
        description: "Description of task 1",
        state: "To Do",
      },
      {
        title: "Task 2",
        description: "Description of task 2",
        state: "Doing",
      },
      {
        title: "Task 3",
        description: "Description of task 3",
        state: "Done",
      },
    ];
  }

  async newTask(task: Task): Promise<Task> {
    // lógica de envio de tarefa para o back
    try{
      const token = localStorage.getItem('token');
      const response = await fetch("https://localhost:8000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? {"Authorization": `Bearer ${token}`} : {}),
        },
        body: JSON.stringify(task)
      });

      if (!response.ok){
        throw new Error(`Error while creating task: ${response.statusText}`);
      }

      const createdTask = await response.json();
      return createdTask;

    } catch (error) {
      console.error("Error while creating task:", error);
      throw error;
    }
  }
}

export default new TaskService();