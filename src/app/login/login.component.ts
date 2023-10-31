import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  signinUser: FormGroup;
  showPassword = false;
  data:any;
  

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.signinUser = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
   //this.getUser();
  }

  submitForm() {
    if (this.signinUser.valid) {
      // Submit the form data
      this.loginService.signin(this.signinUser.value).subscribe({
        next: (val: any) => {
          alert('Login Successfully');
          console.log(val);
          sessionStorage.setItem('loggedIn', 'true');
          sessionStorage.setItem('role', val.roles[0]); // Access the roles array
          sessionStorage.setItem('token', val.token); //token setting
          sessionStorage.setItem('username',val.username);
          
          // Redirect to a specific route after successful login if needed
          this.router.navigate(['/restaurantlist']);
          // this.router.navigate(['/navbar']);
        },
        error: (error) => {
          console.error('Error:', error);
          alert('Error in username or password'); // Handle login failure
        },
      });
    } else {
      // Handle validation errors
      alert('Please Enter Valid Data');
      console.log('Form contains validation errors.');
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  goBack() {
    window.location.reload(); // Reload the page
  }

  
  

}
