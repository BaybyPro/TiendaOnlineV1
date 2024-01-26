import { COMPILER_OPTIONS, Component } from '@angular/core';
import { Compo } from 'src/app/model/components';
import { ServiceService } from 'src/app/services/service.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/model/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [UploadService]
})
export class CreateComponent {
    public compo : Compo;
    public status : boolean;
    public filesToUpload : Array<File> =[];
    public title : string
    public success: string;
    public url : string
    public saveCompo: any;

    constructor(
      private _service: ServiceService,
      private uploadService : UploadService
    ){
      this.compo = new Compo('','','',[],0.00,0,''),
      this.status = false
      this.title = 'Crear nuevo componente'
      this.url = Global.url;
      this.success = 'Componente creado puedes añadir sus detalles '
    }

    onSubmit(form:any){
      this._service.saveCompo(this.compo).subscribe(
        response =>{
           if(response){
            
            //subir imagen
            this.uploadService.makeFileRequest(this.url+"/uploadImage/"+response.component._id,[],this.filesToUpload,'image')
            .then((result:any)=>{
              this.status = true
                console.log(result)
                this.saveCompo = result.compo
                form.reset();
            });
            form.reset();
           }else{
            this.status = false
           }
        },
        error=>{
          console.log(<any>error)
        }
      )
    }

    hideStatus(){
      this.status = false
           
    }

    fileChangeEvent(fileInput:any){
           this.filesToUpload = <Array<File>>fileInput.target.files;
    }
}
