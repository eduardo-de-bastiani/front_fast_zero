export type TaskState = 'Draft' | 'To Do' | 'Doing' | 'Done';

export interface TaskFormData {
  title: string;
  description?: string;
  state: TaskState;
}