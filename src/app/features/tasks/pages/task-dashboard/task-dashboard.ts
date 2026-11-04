import { Component, computed, inject, signal } from '@angular/core';
import { TaskService } from '../../../../core/services/task.service';
import { Task, TaskPriority } from '../../../../core/models/task.model';
import { TaskForm } from '../../components/task-form/task-form';
import { TaskList } from '../../components/task-list/task-list';

@Component({
  selector: 'app-task-dashboard',
  standalone: true,
  imports: [TaskForm, TaskList],
  templateUrl: './task-dashboard.html',
  styleUrl: './task-dashboard.scss'
})
export class TaskDashboard {

  private taskService = inject(TaskService);

  tasks = this.taskService.tasks;

  showForm = signal(false);
  selectedTask = signal<Task | null>(null);

  filter = signal<'Todas' | 'Pendientes' | 'Completadas'>('Todas');
  priorityFilter = signal<'Todas' | TaskPriority>('Todas');

  pendingTasks = computed(() =>
    this.tasks().filter(task => !task.completed).length
  );

  completedTasks = computed(() =>
    this.tasks().filter(task => task.completed).length
  );

  filteredTasks = computed(() => {
    return this.tasks().filter(task => {
      const matchesStatus =
        this.filter() === 'Todas' ||
        (this.filter() === 'Pendientes' && !task.completed) ||
        (this.filter() === 'Completadas' && task.completed);

      const matchesPriority =
        this.priorityFilter() === 'Todas' ||
        task.priority === this.priorityFilter();

      return matchesStatus && matchesPriority;
    });
  });

  openCreateForm(): void {
    this.selectedTask.set(null);
    this.showForm.set(true);
  }

  openEditForm(task: Task): void {
    this.selectedTask.set(task);
    this.showForm.set(true);
  }

  closeForm(): void {
    this.showForm.set(false);
    this.selectedTask.set(null);
  }

  saveTask(data: Omit<Task, 'id' | 'completed' | 'createdAt'>): void {
    const currentTask = this.selectedTask();

    if (currentTask) {
      this.taskService.updateTask({
        ...currentTask,
        ...data
      });
    } else {
      this.taskService.addTask(data);
    }

    this.closeForm();
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id);
  }

  toggleTask(id: string): void {
    this.taskService.toggleTask(id);
  }
}
