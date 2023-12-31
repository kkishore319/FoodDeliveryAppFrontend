import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isLoggedIn: boolean;

  constructor(){
    const loggedInValue = sessionStorage.getItem('loggedIn');
    this.isLoggedIn = loggedInValue === 'true';
  }

}
