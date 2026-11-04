import { Routes } from '@angular/router';
import { TaskDashboard } from './features/tasks/pages/task-dashboard/task-dashboard';

export const routes: Routes = [
  {
    path: '',
    component: TaskDashboard
  },
  {
    path: '**',
    redirectTo: ''
  }
];
