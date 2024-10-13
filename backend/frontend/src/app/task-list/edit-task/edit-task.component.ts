import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../tasklist/task.service';
import { Task } from '../model/task.model';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css',
})
export class EditTaskComponent {
  @Input() users: String[] = [];

  @Output() cancel = new EventEmitter<String>();
  @Output() save = new EventEmitter<String>();

  statuses: String[] = ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'];
  priorities: String[] = ['LOW', 'NORMAL', 'HIGH'];
  @Input() task: Task = {};

  taskId: any = '';

  dueDate: String = 's';

  ngOnInit() {
    this.dueDate = this.setDate(this.task.dueDate);
    this.taskId = this.task._id;
  }

  setDate(isoDate: any): String {
    const date = new Date(isoDate);
    const formattedDate = date.toISOString().split('T')[0];
    // this.task.dueDate = new Date(date.toISOString()); // Update task.dueDate
    return formattedDate;
  }

  constructor(private taskService: TaskService) {}

  onCancel(): void {
    this.cancel.emit();
  }

  onDateChange() {
    // this.task.dueDate = new Date(this.dueDate); // Update task.dueDate

    this.task.dueDate = new Date(this.dueDate.toString());
  }

  onSave(): void {
    console.log(this.task);
    this.taskService.updateTask(this.taskId, this.task);
    this.save.emit();
  }
}
