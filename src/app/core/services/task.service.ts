import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly storageKey = 'taskflow.tasks';

  private readonly tasksSignal = signal<Task[]>(
    this.loadTasks()
  );

  readonly tasks = this.tasksSignal.asReadonly();

  private loadTasks(): Task[] {
    try {
      const stored = localStorage.getItem(this.storageKey);

      if (!stored) return [];

      const tasks: unknown = JSON.parse(stored);

      if (!Array.isArray(tasks)) return [];

      const isValidTask = (task: any): boolean => {
        return (
          task !== null &&
          typeof task === 'object' &&
          typeof task.id === 'string' &&
          typeof task.title === 'string' &&
          typeof task.description === 'string' &&
          ['Baja', 'Media', 'Alta'].includes(task.priority) &&
          typeof task.completed === 'boolean' &&
          typeof task.createdAt === 'string' &&
          (
            task.dueDate === undefined ||
            task.dueDate === null ||
            (
              typeof task.dueDate === 'string' &&
              !isNaN(Date.parse(task.dueDate))
            )
          )
        );
      };

      if (!tasks.every(isValidTask)) return [];

      return tasks.map((task: Task) => ({
        ...task,
        dueDate: task.dueDate ?? null
      }));

    } catch {
      return [];
    }
  }

  private saveTasks(): void {
    try {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify(this.tasksSignal())
      );
    } catch (error) {
      console.error('No se pudieron guardar las tareas:', error);
    }
  }

  addTask(data: Omit<Task, 'id' | 'completed' | 'createdAt'>): void {
    const newTask: Task = {
      ...data,
      id: crypto.randomUUID(),
      completed: false,
      createdAt: new Date().toISOString()
    };

    this.tasksSignal.update(tasks => [newTask, ...tasks]);
    this.saveTasks();
  }

  updateTask(updatedTask: Task): void {
    this.tasksSignal.update(tasks =>
      tasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );

    this.saveTasks();
  }

  deleteTask(id: string): void {
    this.tasksSignal.update(tasks =>
      tasks.filter(task => task.id !== id)
    );

    this.saveTasks();
  }

  toggleTask(id: string): void {
    this.tasksSignal.update(tasks =>
      tasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );

    this.saveTasks();
  }
}
