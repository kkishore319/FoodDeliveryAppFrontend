import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { profile } from '../model/profile';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit{

  constructor(private loginService:LoginService){

  }

  users!: profile[]; 

  ngOnInit(): void {
    this.getAllCustomers()
  }

  getAllCustomers(){
    this.loginService.getAllUsers().subscribe(
      res => {
        console.log(res); // Log the response
        this.users = res as profile[]; // Try type casting
      },
      err => console.log(err)
    )
  }
}

  



