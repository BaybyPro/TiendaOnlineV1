import { Component } from '@angular/core';
import { Compo } from 'src/app/model/components';
import { ServiceService } from 'src/app/services/service.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/model/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
 
  public status : boolean;
  public filesToUpload : Array<File> =[];
  public title : string
  public compo : any;
  public success : string;
  public url : string
  public saveCompo: any;
  
  constructor(
    private _service: ServiceService,
    private uploadService : UploadService,
    private router : Router,
    private route: ActivatedRoute
  ){
    this.status = false
    this.compo = Compo
    this.title = 'Editar componente';
    this.url = Global.url;
    this.success = 'Componente creado puedes añadir sus detalles ';
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
     this._service.getCOmpo(id).subscribe(
       (response:any) =>{
             this.compo = response.component
       },
       (error:any)=>{
         console.log(error)
       }
     )
 }

 hideStatus(){
  this.status = false
       
}

onSubmit(form:any){
  this._service.updateCompo(this.compo).subscribe(
    response =>{
       if(response){
        this.saveCompo = response.component
        if(this.filesToUpload){
          this.uploadService.makeFileRequest(this.url+"/uploadImage/"+response.component._id,[],this.filesToUpload,'image')
          .then((resulst:any)=>{
            this.status = true
              console.log(resulst)
              
          });
        }  else{
          this.status = true;
          console.log(response)
        }
       }else{
        this.status = false
       }
    },
    error=>{
      console.log(<any>error)
    }
  )
}

fileChangeEvent(fileInput:any){
  this.filesToUpload = <Array<File>>fileInput.target.files;
}

}
