import { Component } from '@angular/core';
import { User } from 'src/app/model/model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  public user: any
  public status: boolean

  constructor(
     private auth: AuthService,
     private router: Router    
  ){
    this.user = new User('',''),
    this.status = true
  }

  signUp() {
    this.auth.signUp(this.user)
      .subscribe(
        (res: any) => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/task']);
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          if (err.status === 409) {
            this.status = false;
            console.log(this.status);
            // Realizar acciones específicas para el conflicto
          }
        }
      );
  }
  

}
