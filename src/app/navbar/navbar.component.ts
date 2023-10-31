import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  isRole: string | null = null; // Initialize isRole as a string or null
  

  constructor(private router: Router) { }

  ngOnInit(): void {
    const loggedInValue = sessionStorage.getItem('loggedIn');
    this.isLoggedIn = loggedInValue === 'true';
    this.isRole = sessionStorage.getItem('role');


    // if (this.isLoggedIn === true && this.isRole === 'Admin') {
    //   this.router.navigate(['/adminLogin']);
    // }
  }



  
  handleLogout(): void {
    // Handle the logout action here, e.g., clear sessionStorage and navigate to the login page
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('loggedIn');
    sessionStorage.removeItem('role');
    sessionStorage.clear();
    this.isLoggedIn = false; // Update the logged-in status
    this.router.navigate(['/login']);
  }

  
}