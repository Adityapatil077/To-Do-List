import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../model/task.model';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../tasklist/task.service';

@Component({
  selector: 'app-delete-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css'],
})
export class DeleteTaskComponent {
  @Input() task: Task = {};

  @Output() delete = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter();

  constructor(private taskService: TaskService) {}

  onNo() {
    this.cancel.emit();
  }

  onYes() {
    this.taskService.deleteTask(this.task._id)
      .then(() => {
        console.log('Task deleted successfully');
        this.delete.emit(); // Emit an event if you want to notify other components
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
        alert('Task not deleted: ' + error.message); // Show an alert or notification
      });
  }
  
}
