import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestaurantService } from '../services/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent {
  restaurantForm: FormGroup;

  constructor(private fb: FormBuilder, private restaurantService:RestaurantService,private route:Router) {
    this.restaurantForm = this.fb.group({
      restaurantId: ['', [Validators.required, Validators.pattern('\\d{3}')]],
      restaurantName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
       rating: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
      type: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      location: ['', [Validators.required, Validators.min(5), Validators.max(50)]]
    });
  }

  
  submitForm() {
    if (this.restaurantForm.valid) {
      // Submit the form data
      console.log(this.restaurantForm.value);
      this.restaurantService.addRestaurant(this.restaurantForm.value).subscribe({
        next:(val:any)=>{
          console.log(val)
           alert("Data Added Successfully")
           window.location.reload();
        } 
      })
      
    } else {
      // Handle validation errors
      alert('Please Enter Valid Data')
      console.log('Form contains validation errors.');
    }
  }

  
  reload(){
    window.location.reload();
  }
  goback(){
    this.route.navigate(['/restaurantlist'])
  }
}

