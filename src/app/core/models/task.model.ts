export type TaskPriority = 'Baja' | 'Media' | 'Alta';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  completed: boolean;
  createdAt: string;
}
