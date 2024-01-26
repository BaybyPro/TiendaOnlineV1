import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private URL = 'http://127.0.0.1:3000'

  constructor(private http:HttpClient) { }


  getTask(): Observable<any> {
   return this.http.get<any>(this.URL+'/tasks');
  }

  getTaskPrivate(): Observable<any>{
   return this.http.get<any>(this.URL+'/private');
  }
}
