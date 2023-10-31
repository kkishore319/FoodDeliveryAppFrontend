import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { OrderTable } from '../model/order';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {
 
  constructor(private orderService:OrderService,private router:Router){}

  orders!: OrderTable[];
  fileName= 'orderReport.xlsx';


  ngOnInit(): void {
    this.getAllOrders()
  }

  getAllOrders(){
    this.orderService.viewByOrderName().subscribe(
      res =>{
        this.orders = res;
        console.log(res);
      } 
      ,
      err => console.log(err)
    )
  }

  goToPayments(){
    this.router.navigate(['/payments']);
  }
  deleteOrder(id:number){
    const result = confirm('Are you sure you want to delete this order?'); 
    
    if (result) {
      
      console.log(`Deleting order with ID: ${id}`);
    

    this.orderService.cancelOrder(id).subscribe(
      res =>{
        alert("order deleted");
       
        console.log(res);
      } 
      ,
      err => console.log(err)
    )
    window.location.reload();
  } else {
    // User clicked "Cancel" (no) in the confirmation dialog
    console.log('Deletion canceled');
  }
  }

  // exportexcel(): void
  // {
  //   /* pass here the table id */
  //   let element = document.getElementById('excel-table');
  //   const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

  //   /* generate workbook and add the worksheet */
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  //   /* save to file */
  //   XLSX.writeFile(wb, this.fileName);

  // }
}
