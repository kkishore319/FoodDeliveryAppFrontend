import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
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
  
  placeOrder(data:any ):Observable<any>{
    const requestOptions = this.createRequestOptions();
    let cartId = sessionStorage.getItem('cartId');
    return this.http.post(`${this.url}/order/${cartId}`, data, requestOptions);
   }

   cancelOrder(id: any ):Observable<any>{
    const requestOptions = this.createRequestOptions();
    return this.http.delete(`${this.url}/cancelOrder/${id}`,  requestOptions);
   }

   updateAnOrder(id: any):Observable<any>{
    const requestOptions = this.createRequestOptions();
    return this.http.put(`${this.url}/updateOrder/${id}`, requestOptions);
   }

   viewAnOrderById(id: any):Observable<any>{
    const requestOptions = this.createRequestOptions();
    return this.http.get(`${this.url}/viewOrderById/${id}`, requestOptions);
   }

   viewByOrderName():Observable<any>{
    const requestOptions = this.createRequestOptions();
    const user= sessionStorage.getItem("username");
    return this.http.get(`${this.url}/viewOrderByName/${user}`, requestOptions);
   }

   viewAllOrder():Observable<any>{
    const requestOptions = this.createRequestOptions();
    return this.http.get(`${this.url}/viewAllOrders`, requestOptions);
   }

   updateFailedPayment(id: any):Observable<any>{
    const requestOptions = this.createRequestOptions();
    return this.http.put(`${this.url}/updateFailedPayment/${id}`, requestOptions);
   }

}
