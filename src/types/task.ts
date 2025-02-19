export type TaskState = "draft" | "todo" | "doing" | "done";

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
