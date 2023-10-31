import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  signupForm!:FormGroup;
  addUserErrorMessage : any;
  showPassword: boolean=false;


  constructor(private formBuilder: FormBuilder, private register: RegisterService, private router: Router ){
    this.signupForm= this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20),Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^&*()_+])[A-Za-z\d@#$!%^&*()_+]{8,}$/)
        ]
      ],
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [0, [Validators.required, Validators.pattern(/^[6,7,8,9]{1}[0-9]{9}$/), Validators.maxLength(12),  Validators.minLength(10)]],
      country: ['', Validators.required]
    })
  }

  submitForm(){
    if (this.signupForm.valid) {
      // Submit the form data
      console.log(this.signupForm.value);
      this.register.addUser(this.signupForm.value).subscribe({
        next:(val:any)=>{
          alert("Data Added Successfully")
          sessionStorage.setItem('cartId',val.phoneNumber)
          // window.location.reload(); // Reload the page
          this.router.navigate(['/login']); 
        },
        error:(val:any)=>
        {
          this.addUserErrorMessage=val;
          // this.addUserErrorMessage=val.error.message;
          window.scrollTo(0,0);
          // console.log(val.e);
          // alert(val.error.message);
        }
      })
    } else {
      // Handle validation errors
      console.log('Form contains validation errors.');
      alert("Please Provide Valid Data")
    }
  }

  goBack(){
    window.location.reload(); // Reload the page
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
