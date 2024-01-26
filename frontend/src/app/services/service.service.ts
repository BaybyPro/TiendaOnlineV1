import { Injectable } from '@angular/core';
import { Global } from '../model/global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Compo } from '../model/components';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  public url:string;
  
  

  constructor(
    private http:HttpClient
  ) {
       this.url = Global.url

   }

   saveCompo(compo:Compo){
      return this.http.post<any>(this.url+'/savecompo',compo)
   }

   getCompos(){
    return this.http.get<any>(this.url+'/components')
   }

   getCOmpo(id:any){
    return this.http.get<any>(this.url+'/component/'+ id)
   }

   deleteCompo(id:any){
    return this.http.delete<any>(this.url+'/component/'+ id)
   }
   updateCompo(compo:any){

    return this.http.put<any>(this.url+'/component/'+compo._id,compo)
   }
}
