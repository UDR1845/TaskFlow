import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Task } from '../../../../core/models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  templateUrl: './task-item.html',
  styleUrl: './task-item.scss',
  imports: [DatePipe]
})
export class TaskItem {

  @Input({ required: true }) task!: Task;

  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<string>();
  @Output() toggle = new EventEmitter<string>();

  get priorityClass(): string {
    switch (this.task.priority) {
      case 'Alta': return 'bg-danger-subtle text-danger';
      case 'Media': return 'bg-warning-subtle text-warning-emphasis';
      default: return 'bg-success-subtle text-success';
    }
  }

  get isOverdue(): boolean {
    if (!this.task.dueDate || this.task.completed) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(`${this.task.dueDate}T00:00:00`);

    return dueDate < today;
  }
}
