export type TaskState = "draft" | "todo" | "doing" | "done";

export interface Task {
  title: string;
  description?: string;
  state: TaskState;
}


export interface TaskFilters {
  title?: string;
  description?: string;
  state?: string;
  offset?: number;
  limit?: number;
}

export interface TaskFormData {
  title: string;
  description?: string;
  state: TaskState;
}
