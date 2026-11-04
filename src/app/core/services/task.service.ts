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

      return stored ? JSON.parse(stored) as Task[] : [];
    } catch {
      return [];
    }
  }

  private saveTasks(): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.tasksSignal())
    );
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
