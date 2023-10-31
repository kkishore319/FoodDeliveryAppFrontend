import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
declare var Razorpay: any;


@Component({
  selector: 'app-root',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {

cost = sessionStorage.getItem('totalCost');
username = sessionStorage.getItem('username');
constructor(private router : Router,private orderService:OrderService){

}

payNow() {
  const RozarpayOptions = {
    description: 'Sample Razorpay demo',
    currency: 'INR',
    amount: (Number(this.cost) || 0) * 100,
    name: this.username,
    key: 'rzp_test_ESasIRstiPkWOT',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjocfAiPmkzqDQu_tmtXKQPauoSBwQIwT1iDtMsAPA2SPucnhwVz-k9-rplQqmWDUI5uA&usqp=CAU',
    
    prefill: {
      name: this.username,
      
    },
    theme: {
      color: '#006400'
    },
    modal: {
      ondismiss:  () => {
        console.log('dismissed')
        this.changeStatusToFailed();
        //console.log("hehe");
      }
    },
    
    
  }

  const successCallback = (paymentid: any) => {
    console.log('Success Callback:', paymentid);
    alert('Payment is done');
    this.router.navigate(['/itemlist']);
  };
  

  this.router.navigate(['/itemlist']);
  this.changeStatus();
  const failureCallback = (e: any) => {
    console.log('Failure Callback:', e);
    alert('Try it again');
  };
  Razorpay.open(RozarpayOptions,successCallback, failureCallback)
  
}

changeStatus(){
  var id = sessionStorage.getItem('orderid'); // Assuming idString is a string like "12345"
  if (id !== null) {
    // id is not null, so it's safe to parse it as an integer
    let orderid = parseInt(id, 10); 
  
  this.orderService.updateAnOrder(orderid).subscribe(
    res =>{
      //alert("order deleted");
      console.log(res);
    } 
    ,
    err => console.log(err)
  )
}
}

changeStatusToFailed(){
  var id = sessionStorage.getItem('orderid'); // Assuming idString is a string like "12345"
  if (id !== null) {
    // id is not null, so it's safe to parse it as an integer
    let orderid = parseInt(id, 10); 
  
  this.orderService.updateFailedPayment(orderid).subscribe(
    res =>{
      
      console.log(res);
    } 
    ,
    err => console.log(err)
  )
}
}


}



