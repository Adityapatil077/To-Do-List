import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../tasklist/task.service';
import { Task } from '../model/task.model';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  @Input() users: String[] = ['ds'];

  @Output() cancel = new EventEmitter<String>();
  @Output() save = new EventEmitter<String>();

  statuses: String[] = ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'];
  priorities: String[] = ['LOW', 'NORMAL', 'HIGH'];
  task: Task = {
    status: this.statuses[0],
    priority: this.priorities[0],
    assignedTo: this.users[0],
    dueDate: new Date(),
  };

  constructor(private taskService: TaskService) {}

  onCancel(): void {
    this.cancel.emit();
  }

  onSave(): void {
    console.log(this.task);
    this.taskService.createTask(this.task);
    this.save.emit();
  }
}
