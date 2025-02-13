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
    return task;
  }
}

export default new TaskService();
