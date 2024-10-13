import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { DeleteTaskComponent } from './delete-task/delete-task.component';
import { TaskService } from '../tasklist/task.service';
import { Task } from './model/task.model';
import { NewTaskComponent } from './new-task/new-task.component';

@Component({
  selector: 'app-task-list',
  imports: [
    CommonModule,
    NgFor,
    EditTaskComponent,
    DeleteTaskComponent,
    NewTaskComponent,
  ],
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: [
    './task-list.component.css',
    '../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css',
  ],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  currentPage = 1;
  itemsPerPage = 20;

  isEditTaskVisible: boolean = false;
  isNewTaskVisible: boolean = false;
  isDeleteTaskVisible: boolean = false;
  selectedtask: Task = {};
  users = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
    this.getUsers();
  }

  getTasks() {
    this.taskService.getTasks().then((res) => {
      this.tasks = res.data;
    });
  }

  getUsers() {
    this.taskService.getUsers().then((res) => {
      this.users = res.data;
    });
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  addNewTask(): void {
    this.toggleNewTaskComponentVisibility();
  }

  editTask(task: Task): void {
    this.toggleEditTaskComponentVisibility();
    this.selectedtask = task;
  }

  deleteTask(task: Task): void {
    this.toggleDeleteTaskComponentVisibility();
    this.selectedtask = task;
  }

  toggleDeleteTaskComponentVisibility() {
    this.isDeleteTaskVisible = !this.isDeleteTaskVisible;
  }

  toggleEditTaskComponentVisibility() {
    this.isEditTaskVisible = !this.isEditTaskVisible;
  }
  toggleNewTaskComponentVisibility() {
    this.isNewTaskVisible = !this.isNewTaskVisible;
  }

  refreshTaskList() {
    this.getTasks();
  }

  setDate(isoDate: any): String {
    const date = new Date(isoDate);
    return date.toISOString().split('T')[0];
  }

  ceil(value: number): number {
    return Math.ceil(value);
  }
}
