export type TaskState = "Draft" | "To Do" | "Doing" | "Done";

export interface Task {
  title: string;
  description?: string;
  state: TaskState;
}

export interface TaskFormData {
  title: string;
  description?: string;
  state: TaskState;
}
