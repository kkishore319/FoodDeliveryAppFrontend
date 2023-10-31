import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { OrderTable } from '../model/order';


@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent {

  constructor(private orderService:OrderService,private router:Router){}

  orders!: OrderTable[];
  fileName= 'orderReport.xlsx';


  ngOnInit(): void {
    this.getAllOrders()
  }

  getAllOrders(){
    this.orderService.viewAllOrder().subscribe(
      res =>{
        this.orders = res;
        console.log(res);
      } 
      ,
      err => console.log(err)
    )
  }

  goToPayments(){
    this.router.navigate(['/paymentlist']);
  }

  deleteOrder(id:number){
    this.orderService.cancelOrder(id).subscribe(
      res =>{
        alert("order deleted");
       
        console.log(res);
      } 
      ,
      err => console.log(err)
    )
    window.location.reload();
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
