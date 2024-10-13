import { Injectable } from '@angular/core';
import axios from 'axios';
import { Task } from '../task-list/model/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {}

  private API_URL = 'http://localhost:8080/';

  getTasks() {
    const route = this.API_URL + 'task';
    return axios.get(route);
  }

  getUsers() {
    const route = this.API_URL + 'task/users';
    return axios.get(route);
  }

  createTask(task: Task) {
    const route = this.API_URL + 'task';
    return axios.post(route, task);
  }

  updateTask(id: String, task: Task) {
    const route = this.API_URL + `task/${id}`;
    return axios.put(route, task);
  }

  deleteTask(id?: String) {
    console.log(`delete Service : ${id}`)
    const route = this.API_URL + `task/${id}`;
    return axios.delete(route);
  }
}
