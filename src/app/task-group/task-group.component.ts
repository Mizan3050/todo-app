import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TaskGroup } from '../model/taskGroup.mode';

export interface NewTask {
  task: any,
  index: number
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

  @Input() taskGroup: TaskGroup = {title: '', tasks: []};
  @Input() index: number = 0;

  @Output() newTaskListEvent = new EventEmitter<NewTask>();
  @Output() deleteTaskEvent = new EventEmitter<DeleteTask>();
  id = '';
  taskList: string[] = [];

  inputTask = new FormControl('');

  constructor() { }

  ngOnInit(): void {
    this.id = String.fromCharCode(97 + this.index)
  }

  addTask(){
    if(this.inputTask.value){
      const newTask = {task: this.inputTask.value, index: this.index}
      this.inputTask.reset();
      this.newTaskListEvent.emit(newTask);
    }
  }

  deleteTask(i: number){
    const deleteTaskId = {groupNumber: this.index, taskId: i};
    this.deleteTaskEvent.emit(deleteTaskId);
  }
}
