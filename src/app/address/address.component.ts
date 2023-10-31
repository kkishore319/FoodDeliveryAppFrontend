import { Component } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent {
/*

paymentMode = "COD";
  
transaction:Transaction 

constructor(private homeService:HomeService,private router:Router,private cart:CartComponent,private jwt:JwtServiceService){
  this.getAllAddresses()
  this.transaction =  {
    transactionId: 0,
    cartId: 0,
    userName: '',
    amount: 0,
    transactionStatus: '',
    paymentMode: ''
  }
}




// openForm = false;




selectedAddress: Address | null = null;


addresses:Address[];


order:Order = {
  orderDate: '',
  customerName: '',
  amountPaid: 0,
  modeOfPayment: '',
  orderStatus: '',
  quantity: 0,
  address:{
    city: '',
    flatNumber: 0,
    fullName: '',
    mobileNumber: '',
    pincode: 0,
    state: '',
    customerId: 0
  }
}




addressForm = new FormGroup({
  fullName: new FormControl('', [Validators.required]),
  flatNumber: new FormControl('',[Validators.required]),
  city: new FormControl('', [Validators.required]),
  mobileNumber: new FormControl('',[Validators.required, Validators.pattern("^(\\+91|\\+91\\-|)?[6789]\\d{9}$")]),
  pincode: new FormControl('', [Validators.required]),
  state: new FormControl('',[Validators.required])
});


orderButton = false;
deleteButton = false;


selectAddress(address: Address) {
  this.orderButton = true;
  this.deleteButton = true;
  this.selectedAddress = address;
}

address:Address = {
  city: '',
  flatNumber: 0,
  fullName: '',
  mobileNumber: '',
  pincode: 0,
  state: '',
  customerId: 0
};
*/

/*
}







goBack(){
  this.router.navigate(['customer/cart'])
}






getAllAddresses(){
  this.homeService.getAllAddressByCustomerName().subscribe(
    res => this.addresses = res,
    err => console.log(err)
  )
}



saveAddress(formData:any){
  this.homeService.addAddress(formData).subscribe(
    res => {
      this.address = res
      location.reload()
    },
    err => console.log(err)
  )
}




// async placeOrderAndCheckOut() {
//   await this.checkOut();
//   // Delay for a certain time (e.g., 2000 milliseconds) to allow for checkout to complete
//   // Adjust the delay time as needed based on the actual time it takes for checkout
//   await delay(2000);
//   this.placeOrder();
// }


// private delay(ms: number): Promise<void> {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }












  


placeOrder(){
    this.cart.getAllProducts()
    console.log(this.selectedAddress)
    this.order.address = this.selectedAddress;
    this.order.modeOfPayment = this.paymentMode;
    this.order.quantity = this.cart.totalProducts;
    this.order.customerName = this.jwt.getUser();
    this.homeService.placeOrder(this.order).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['customer/allOrders'])
      },
      err => {
        console.log(err);
      }
    )
}

checkOut(){
  this.homeService.order(this.paymentMode).subscribe(
    res => {
      this.transaction = res;
      console.log(res);
      // this.router.navigate(['customer/allOrders']);
      // console.log(res)
    },
    err => {
      console.log(err);
    }
  )
}


deleteAddress(id:number){
  this.homeService.deleteAddressById(id).subscribe(
    res => {
      console.log(res)
      alert("address deleted")
      location.reload()
    },
    err => console.log(err)
  )
}
*/
}
