import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { OnInit } from '@angular/core';
declare const $:any

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{

  tasks:any = [];

  constructor(private taskService: TaskService){

  }
  ngOnInit() {
    this.taskService.getTask().subscribe(

    res=>{
      console.log(res)

      this.tasks = res;
    },
    err=>{
      console.log(err)
    }
    )

    $(function(){
      $('.bxslider').bxSlider({
        auto: true,
        captions: true,
        slideWidth: 2000
      });
    });
  
      
  }



}
