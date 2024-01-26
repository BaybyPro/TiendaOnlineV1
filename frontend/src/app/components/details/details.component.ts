import { Component,OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Compo } from 'src/app/model/components';
import { Global } from 'src/app/model/global';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
   
  public url: string;
  public compo : any;
  public confirm : boolean;
  constructor(
    private service : ServiceService,
    private router: Router,
    private route: ActivatedRoute
  ){
      this.url = Global.url
      this.compo = Compo;
      this.confirm = false;
  }
  ngOnInit(): void {
     this.route.params.subscribe(
      params =>{
        let id = params['id'];
        this.getCompo(id)
      }
     )
  }

  getCompo(id:any){
      this.service.getCOmpo(id).subscribe(
        response =>{
              this.compo = response.component
        },
        error=>{
          console.log(error)
        }
      )
  }

  deleteCompo(id:any){
      this.service.deleteCompo(id).subscribe(
        response=>{
           if(response.component){
            this.router.navigate(['/private'])
           }
        },
        err =>{
          console.log(err)
        }
      )
  }

  setConfirm(confirm:boolean){
    this.confirm = confirm;
  }

 
}
