import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
// import { OrderTable } from '../model/order';
import { OrderService } from '../services/order.service';
// import { CartComponent } from '../cart/cart.component';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CartService } from '../services/cart.service';
// import { Payment } from '../model/payment';
// import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup;

   user=sessionStorage.getItem('username');

  constructor(private formBuilder: FormBuilder,private cartService:CartService, private orderService: OrderService,private router :Router) {
    this.orderForm = this.formBuilder.group({
      orderId:[''],
      username:[this.user,Validators.required],
      orderName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
    //  pincode:["",Validators.required,  Validators.pattern(/^\d{6}$/)],
      //pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      pincode: ["", [Validators.required, Validators.pattern(/^\d{6}$/)]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      orderInstructions: [''],
     
    });
    
  }

  ngOnInit(): void {
    this.orderForm.setValue
  }

  submitOrder() {
    if (this.orderForm.valid) {
      const orderData = this.orderForm.value;

      this.orderService.placeOrder(orderData).subscribe(
        (response) => {
          const responseString = response.toString();  // Make sure it's a string
          const id = responseString.slice(-4);  // Get the last four characters
          const cost = responseString.slice(0, -4);  // Remove the last four characters to get the cost

          sessionStorage.setItem('totalCost', cost);
          sessionStorage.setItem('orderid', id);
          console.log(id);
           console.log(response);
           alert("Order has been placed, Please complete the payment")


           
            this.cartService.deleteCart().subscribe(
              res => { 
                //this.cartItemsList = res; 
              }
            )
          this.router.navigate(['/payment']);
          }
        
        
        ,
        (error) => {
          // Handle error (e.g., show an error message)
          console.error('Error placing the order:', error);
        }
      );
    }
  }

  
  // Add more methods to interact with your OrderService for other order-related actions
}
