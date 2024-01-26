import { Component,HostListener } from '@angular/core';
import { AuthService } from './services/auth.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public screenWidth : number;

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.screenWidth = window.innerWidth;
  }
  constructor (
    public authService: AuthService){
      this.screenWidth = window.innerWidth;
    }
  title = 'frontend';

  ngOnInit(): void {
  }
}
