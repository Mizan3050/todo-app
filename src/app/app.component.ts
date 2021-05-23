import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  taskList: string[] = [];

  inputTask = new FormControl('');
  ngOnInit(): void {
    const tasks: string[] = JSON.parse(localStorage.getItem('tasks') || '{}');
    if(tasks.length>0) {
      this.taskList.push(...tasks);
    }
  }

  addTask(){
    this.taskList.push(this.inputTask.value);
    this.inputTask.reset();
    localStorage.setItem('tasks', JSON.stringify(this.taskList))
  }

  deleteTask(i: number){
    this.taskList.splice(i,1);
    localStorage.setItem('tasks', JSON.stringify(this.taskList))
  }
}
