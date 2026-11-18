
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TaskService } from './task.service';
import { Task } from '../models/task.model';

describe('TaskService', () => {
  let service: TaskService;

  const taskData = {
    title: 'Estudiar Angular',
    description: 'Practicar pruebas unitarias',
    priority: 'Alta' as const,
    dueDate: null
  };

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [TaskService]
    });

    service = TestBed.inject(TaskService);
  });

  it('debe iniciar con una lista vacía', () => {
    expect(service.tasks()).toEqual([]);
  });

  it('debe agregar una tarea correctamente', () => {
    service.addTask(taskData);

    expect(service.tasks()).toHaveLength(1);
    expect(service.tasks()[0].title).toBe('Estudiar Angular');
    expect(service.tasks()[0].completed).toBe(false);
  });

  it('debe actualizar una tarea existente', () => {
    service.addTask(taskData);
    const task = service.tasks()[0];

    const updatedTask: Task = {
      ...task,
      title: 'Estudiar TypeScript'
    };

    service.updateTask(updatedTask);

    expect(service.tasks()[0].title).toBe('Estudiar TypeScript');
  });

  it('debe eliminar una tarea', () => {
    service.addTask(taskData);
    const id = service.tasks()[0].id;

    service.deleteTask(id);

    expect(service.tasks()).toHaveLength(0);
  });

  it('debe cambiar el estado de una tarea', () => {
    service.addTask(taskData);
    const id = service.tasks()[0].id;

    service.toggleTask(id);

    expect(service.tasks()[0].completed).toBe(true);
  });

  it('debe guardar las tareas en LocalStorage', () => {
    service.addTask(taskData);

    const storedTasks = JSON.parse(
      localStorage.getItem('taskflow.tasks') ?? '[]'
    );

    expect(storedTasks).toHaveLength(1);
    expect(storedTasks[0].title).toBe('Estudiar Angular');
  });

  it('debe recuperar tareas guardadas en LocalStorage', () => {
    const savedTask: Task = {
      id: '123',
      title: 'Tarea guardada',
      description: 'Descripción',
      priority: 'Media',
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate: null
    };

    localStorage.setItem(
      'taskflow.tasks',
      JSON.stringify([savedTask])
    );

    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      providers: [TaskService]
    });

    service = TestBed.inject(TaskService);

    expect(service.tasks()).toEqual([savedTask]);
  });

  it('debe manejar datos corruptos en LocalStorage', () => {
    localStorage.setItem('taskflow.tasks', '{JSON inválido');

    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      providers: [TaskService]
    });

    service = TestBed.inject(TaskService);

    expect(service.tasks()).toEqual([]);
  });
});
