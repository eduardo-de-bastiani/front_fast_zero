import { Task } from "../types/task";

interface TaskFilters {
  title?: string;
  description?: string;
  state?: string;
  offset?: number;
  limit?: number;
}

class TaskService {
  async listTasks(filters?: TaskFilters): Promise<Task[]> {
    try{
      const token = localStorage.getItem('token');
      const queryParams = new URLSearchParams();
      if (filters) {
        if (filters.title) queryParams.append("title", filters.title);
        if (filters.description) queryParams.append("description", filters.description);
        if (filters.state) queryParams.append("state", filters.state);
        if (filters.offset !== undefined) queryParams.append("offset", String(filters.offset));
        if (filters.limit !== undefined) queryParams.append("limit", String(filters.limit));
      }

      const url = `http://localhost:8000/tasks${queryParams.toString() ? "?" + queryParams.toString() : ""}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? {"Authorization": `Bearer ${token}`} : {}),
        },
      });

      if (!response.ok){
        const errorBody = await response.text();
        console.error("Error response:", errorBody);
        throw new Error(`Error while listing tasks: ${response.statusText}`);
      }
      const data = await response.json();
      return data.tasks; 
    } catch (error: unknown) {
      console.error("Error while listing tasks:", error);
      throw error;
    }
  }

async newTask(task: Task): Promise<Task> {
    
    try{
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:8000/tasks", {
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