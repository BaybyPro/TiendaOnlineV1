import { Injectable } from '@angular/core';
import { Global } from '../model/global';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  public url: String;

  constructor() { 
    this.url = Global.url
  }

  makeFileRequest(url:string,params:Array<String>,files:Array<File>, name:String){

    return new Promise(function(resolve, reject){
         const formData:any = new FormData();
         var xhr = new XMLHttpRequest();

         for(var i = 0;i< files.length; i++){
           formData.append(name, files[i], files[i].name)
         }

         xhr.onreadystatechange = ()=>{
          if(xhr.readyState == 4){
            if(xhr.status == 200){
              resolve(JSON.parse(xhr.response));
            }else{
              reject(xhr.response)
            }
          }
         }
         xhr.open('POST',url,true);
         xhr.send(formData);
    })

  }
}
