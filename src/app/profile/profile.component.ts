import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { profile } from '../model/profile';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  profileForm:FormGroup;
  passwordPage:boolean=false;
  profile: profile = {} as profile;
  info:string="";



  constructor(private loginService:LoginService){
    this.profileForm = new FormGroup({
      username: new FormControl(),
      email: new FormControl(),
      phoneNumber: new FormControl(),
      country: new FormControl(),
    });
  }


  ngOnInit(): void {
    this.getProfile()
  }

  getProfile() {
    this.loginService.getProfile().subscribe(
      (res:any) => {
        this.profile = res;
        console.log(this.profile);
        this.initializeForm();
      }
    );
  }


  initializeForm() {

    this.profileForm = new FormGroup({
      username: new FormControl(this.profile.username, [Validators.required]),
      email: new FormControl(this.profile.email, [Validators.required,Validators.pattern("[^@\\s]+@[^@\\s]+\\.[^@\\s]+"), Validators.email]),
      phoneNumber: new FormControl(this.profile.phoneNumber,[Validators.required, Validators.pattern("^(\\+91|\\+91\\-|)?[6789]\\d{9}$")]),
      country: new FormControl(this.profile.country, [Validators.required,Validators.pattern("^[A-Za-z]+$")]),
      //password1:new FormControl(this.profile.password, [Validators.required,Validators.pattern("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/")]),
    });
    this.profileForm.get('username')?.disable();
  }


  updateProfile(data:any){
    data.username = this.profile.username
    this.loginService.updateProfile(data).subscribe(
      res => {
        console.log(res);
        alert("Profile Updated")
      },
      err => console.log(err)
    )
  }
  changePassword(){
    console.log(this.passwordPage)
    this.passwordPage=!this.passwordPage;
    console.log(this.passwordPage)
  }
  matchPass(old1: string) {
    const enteredPassword = old1;
    const currentPassword = this.profileForm.get('password')?.value;
  
    if (enteredPassword === currentPassword) {
      this.info = "Passwords match";
  } else {
      this.info = "Passwords do not match"; // Error message
  }
  }
  setPassword(data:any){
    this.loginService.updatePassword(data).subscribe(
      res => {
        console.log(res);
        alert("password changed")
      },
      err => console.log(err)
    )
  }

}