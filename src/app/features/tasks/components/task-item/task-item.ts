import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../../core/models/task.model';
import { DatePipe } from '@angular/common';

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
}
