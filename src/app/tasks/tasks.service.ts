import { inject, Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';
import { LoggingService } from '../logging.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks = signal<Task[]>([]);
  allTasks = this.tasks.asReadonly();
  private loggingService = inject(LoggingService);

  addTask(taskData: { title: string; description: string }) {
    this.tasks.update(oldTasks => [
      ...oldTasks,
      {
        ...taskData,
        id: Math.random().toString(),
        status: 'OPEN',
      },
    ]);
    this.loggingService.log('Added new task');
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update(oldTasks =>
      oldTasks.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            status: newStatus,
          };
        } else {
          return task;
        }
      })
    );
    this.loggingService.log('Updated task status');
  }
}
