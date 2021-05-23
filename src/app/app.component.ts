import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TaskGroup } from './model/taskGroup.mode';
import { DeleteTask, NewTask } from './task-group/task-group.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  taskList: string[] = [];
  showAddTaskList = false;
  tasks: TaskGroup[] = [
/*     {
      title: 'one', tasks: ['one', 'two', 'three']
    },
    {
      title: 'two', tasks: ['four', 'five', 'six']
    },
    {
      title: 'three', tasks: ['seven', 'eight', 'nine']
    } */
  ];

  inputTask = new FormControl('');
  ngOnInit(): void {
    const localTasks: TaskGroup[] = JSON.parse(localStorage.getItem('tasks') || '{}');
    if(localTasks.length>0) {
      this.tasks.push(...localTasks);
    }
  }

  addTaskList(){
    if(this.inputTask.value){
      const newTaskList:TaskGroup = {title: this.inputTask.value, tasks: []}
      this.tasks.push(newTaskList);
      this.inputTask.reset();
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }
  }

  deleteTask(deleteTaskId: DeleteTask){
    const {groupNumber, taskId} = deleteTaskId;
    this.tasks[groupNumber].tasks.splice(taskId, 1);
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }

  showAddTaskInput() {
    this.showAddTaskList = !this.showAddTaskList;
  }

  newTaskListEvent(event: NewTask){
    const {task, index} = event;
    console.log(event);
    this.tasks[index].tasks.push(task); 
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }
}
