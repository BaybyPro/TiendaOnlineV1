import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceService } from 'src/app/services/service.service';
import { Compo } from 'src/app/model/components';
import { Global } from 'src/app/model/global';


@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css'],
  providers: [ServiceService]
})
export class PrivateComponent implements OnInit {

  public compos : Compo[];
  public url : string;

  constructor(private taskService: TaskService,
    private service: ServiceService){
          this.compos = [];
          this.url = Global.url
  }
  
  ngOnInit(): void {
        this.getComponetes()
  }

  getComponetes(){
    this.service.getCompos().subscribe(
      response =>{ 
            this.compos = response
      },
      error =>{
           console.log(<any>error)
      }
    )
  }


}
