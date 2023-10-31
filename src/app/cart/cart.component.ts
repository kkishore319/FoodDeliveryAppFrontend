import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, CartItem } from '../model/cart';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{



  cartItemsList!: Cart;
  cartItems!: CartItem[];
   
  totalPrice!: number;
  

  totalItemss:number=0;
 

  constructor(public cartService: CartService, private router:Router){
    
  }

   cartid= sessionStorage.getItem("cartId");


  getAllItems(){
    this.cartService.getCartById().subscribe(
      res => {
        console.log(res);
        this.cartItemsList = res
        this.cartItems = res.items;
        if(this.cartItems?.length > 0){
          this.checkOutButton = false;
        }
        this.totalPrice = this.cartItemsList.totalPrice
        this.totalItemss = this.cartItemsList.items?.length
        // console.log(this.cartItemsList);
      },
      err => console.log(err)
    )
  }

  checkOutButton = true;
 

  ngOnInit(): void {
   this.getAllItems();
  }

  decreaseItem(itemId:number){
    this.cartService.decreaseItem(itemId).subscribe(
      res => {  
        this.cartItemsList=res;
        location.reload();
      },
      err => {
        console.log(err); 
      }
    )
   
  }
  increaseItem(itemId:number){
    this.cartService.addingItemToCart(itemId).subscribe(
      res => {
        this.cartItemsList = res
        location.reload();
      },
      err => {
        console.log(err);
      }
    )
  }

  removeItem(itemId:number){
    this.cartService.deleteCartItem(itemId).subscribe(
      res => {
        
        this.cartItemsList = res
        location.reload();
      },
      err => {
        console.log(err)
      }
    )
  }


  checkOut(){
    console.log("goin to order comp")
   this.router.navigate(['/order'])
   console.log("i");
  }

 

  deleteCart(){
    this.cartService.deleteCart().subscribe(
      res => {
        
        this.cartItemsList = res
        
      },
      err => {
        console.log(err)
      }
      
    )
    window.location.reload();
  }




}
