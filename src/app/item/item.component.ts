import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { RegisterService } from '../services/register.service';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  itemForm: FormGroup;

  constructor(private fb: FormBuilder, private itemService:RestaurantService,private router:Router) {
    this.itemForm = this.fb.group({
      itemId: ['', [Validators.required, Validators.pattern('\\d{3}')]],
      restaurantId: ['', [Validators.required,  Validators.pattern('\\d{3}')]],
      itemName: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(50)]],
      category: ['', [Validators.required, Validators.min(5), Validators.max(50)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
      price: [0, [Validators.required, Validators.min(5), Validators.max(2000)]],
      image:[""]
    });
  }

  
  submitForm() {
    if (this.itemForm.valid) {
      // Submit the form data
      console.log(this.itemForm.value);
      this.itemService.addItem(this.itemForm.value).subscribe({
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
  gotoitems(){
    this.router.navigate(['/itemlist']);
  }
}
