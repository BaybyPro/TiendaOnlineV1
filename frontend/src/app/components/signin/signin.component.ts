import { Component,OnInit } from '@angular/core';
import { User } from 'src/app/model/model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit{
  public user: any;
  public status: boolean;
  constructor(
    private auth : AuthService,
    private router : Router
  ){

    this.user = new User('',''),
    this.status = true

  }

  signIn(){
    this.auth.signIn(this.user).subscribe(
      res=>{
        console.log(res)
        localStorage.setItem('token',res.token);
        this.router.navigate(['/task']);
      },
      (err: HttpErrorResponse)=>{
        console.log(err);
        if(err.status === 404){
           this.status = false;
        }
      }
  
    )
    
  }

  ngOnInit(): void {
  }

}
