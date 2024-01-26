import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { User } from '../model/model';
import { Observable,of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private URL = 'http://127.0.0.1:3000'

  constructor(
    private http: HttpClient,
    private router : Router
  ) {}

  signUp(user:any){
    
    return this.http.post<any>(this.URL+'/signup',user)
    const conflictError = new HttpErrorResponse({
      error:'Usuario ya registrado',
      status: 409,
      statusText:'conflicto'
    });
    return throwError(conflictError)
  }

  signIn(user:any){

    return this.http.post<any>(this.URL+'/signin',user)

    const conflictError = new HttpErrorResponse({
      error:'user invalid',
      status: 404,
      statusText:'conflicto'
    });
    return throwError(conflictError)
  }

  loggedIn(){
    
    return !!localStorage.getItem('token');
  }

  

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/signin'])
  }

  gettoken(){
    return localStorage.getItem('token');
  }
}
