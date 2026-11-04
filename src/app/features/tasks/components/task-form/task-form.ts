import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, TaskPriority } from '../../../../core/models/task.model';

type TaskFormData = Omit<Task, 'id' | 'completed' | 'createdAt'>;

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss'
})
export class TaskForm implements OnChanges {

  @Input() task: Task | null = null;

  @Output() save = new EventEmitter<TaskFormData>();
  @Output() cancel = new EventEmitter<void>();

  title = '';
  description = '';
  priority: TaskPriority = 'Media';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task']) {
      this.title = this.task?.title ?? '';
      this.description = this.task?.description ?? '';
      this.priority = this.task?.priority ?? 'Media';
    }
  }

  submit(): void {
    if (!this.title.trim()) return;

    this.save.emit({
      title: this.title.trim(),
      description: this.description.trim(),
      priority: this.priority
    });
  }
}
