import { Component } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { Router } from '@angular/router';
import { Payment } from '../model/payment';

@Component({
  selector: 'app-paymentlist',
  templateUrl: './paymentlist.component.html',
  styleUrls: ['./paymentlist.component.css']
})
export class PaymentlistComponent {

  constructor(private paymentService:PaymentService,private router:Router){}

  payments!: Payment[];
  fileName= 'paymentReport.xlsx';


  ngOnInit(): void {
    this.getAllPayments()
  }

  getAllPayments(){
    this.paymentService.viewAllPayments().subscribe(
      res =>{
        this.payments = res;
        console.log(res);
      } 
      ,
      err => console.log(err)
    )
  }

  

  deletePayment(id:number){
    this.paymentService.deletePayment(id).subscribe(
      res =>{
        alert("payment deleted");
       
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

  goBack(){
    this.router.navigate(['/orderlist'])
  }


}
