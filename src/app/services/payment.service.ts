import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) {
  }

  private createRequestOptions(): { headers: HttpHeaders } {
     const token = 'Bearer ' + sessionStorage.getItem('token');
    // Define the headers
    const headers = new HttpHeaders({
      'Authorization': token
    });

    // Define the request options
    const requestOptions = {
      headers: headers
    };

    return requestOptions;
  }

 
  url="http://localhost:8080/registration/authorization"
  

  viewAllPayments():Observable<any>{
    const requestOptions = this.createRequestOptions();
    return this.http.get(`${this.url}/getallpayment`, requestOptions);
   }

  deletePayment(id:number):Observable<any>{
    const requestOptions = this.createRequestOptions();
    return this.http.delete(`${this.url}/deletePayment/${id}`, requestOptions);
  }
}
