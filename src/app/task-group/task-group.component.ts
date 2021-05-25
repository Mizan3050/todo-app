import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TaskGroup } from '../model/taskGroup.model';

export interface NewTask {
  task: any,
  index: number,
}

export interface DeleteTask{
  groupNumber: number;
  taskId: number
}
@Component({
  selector: 'app-task-group',
  templateUrl: './task-group.component.html',
  styleUrls: ['./task-group.component.scss']
})
export class TaskGroupComponent implements OnInit {

  @Input() taskGroup: TaskGroup = {title: '', tasks: [], priority: ''};
  @Input() index: number = 0;

  @Output() newTaskListEvent = new EventEmitter<NewTask>();
  @Output() deleteTaskEvent = new EventEmitter<DeleteTask>();
  @Output() deleteTaskGroupEvent = new EventEmitter<number>();
  @Output() setPriorityEvent = new EventEmitter<{}>();

  showConfirm = false;
  id = '';
  taskList: string[] = [];

  inputTask = new FormControl('');
  
  priorities = ['high', 'medium', 'low'];
  selectedOption = this.priorities[2];

  constructor() { }

  ngOnInit(): void {
    this.id = String.fromCharCode(97 + this.index);
    if(this.taskGroup.priority.length){
      this.selectedOption = this.taskGroup.priority;
    }
    this.selectedOption = this.priorities[2];
  }

  addTask(){
    if(this.inputTask.value){
      const newTask = {task: this.inputTask.value, index: this.index}
      this.inputTask.reset();
      this.newTaskListEvent.emit(newTask);
    }
  }

  setPriority(priority: string) {
    this.selectedOption = priority;
    const priorityObject = {priority: this.selectedOption, index: this.index};
    this.setPriorityEvent.emit(priorityObject);
  }
  deleteTask(i: number){
    const deleteTaskId = {groupNumber: this.index, taskId: i};
    this.deleteTaskEvent.emit(deleteTaskId);
  }

  deleteTaskGroup(){
    this.deleteTaskGroupEvent.emit(this.index);
  }

}
