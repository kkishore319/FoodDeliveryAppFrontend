import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtServiceService } from './jwt-service.service';
import { LocalStorageService } from './local-storage.service';
import { Cart } from '../model/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient,private localStorageService:LocalStorageService,private jwtService:JwtServiceService) {
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

  viewAllCarts():Observable<any>{
    const requestOptions = this.createRequestOptions();
    //return this.http.get<Cart>(this.url+"/getallcarts");
    return this.http.get(`${this.url}/getallcarts`,requestOptions);
   }

   addingItemToCart( itemId:number):Observable<any>{
    const requestOptions = this.createRequestOptions();
    const cartId = sessionStorage.getItem('cartId');
    //return this.http.post("${this.url}/addingitemtocart/"+cartId+"+/${itemId},requestOptions);
    const urlWithParams = `${this.url}/addingitemtocart/${cartId}/${itemId}`;
    
    // Make the GET request with the updated URL
    return this.http.post(urlWithParams, requestOptions);
   }

   getCartById():Observable<any>{
    const requestOptions = this.createRequestOptions();
    const cartId = sessionStorage.getItem('cartId');

    
    return this.http.get(`${this.url}/${cartId}`,requestOptions);
   }

   deleteCartItem(itemId:number):Observable<any>{
    const requestOptions = this.createRequestOptions();
    //const cartId = this.jwtService.getCartId();
    const cartId = sessionStorage.getItem('cartId');
    return this.http.put(`${this.url}/deleteItem/${cartId}/${itemId}`,requestOptions);
   }

   decreaseItem( itemId:number):Observable<any>{
    const requestOptions = this.createRequestOptions();
    const cartId = sessionStorage.getItem('cartId');
   // return this.http.put<Cart>(this.url+"/decreaseQuant/"+itemId+"/"+cartId,
    return this.http.put(`${this.url}/decreaseQuant/${itemId}/${cartId}`,requestOptions);
   }
   deleteCart():Observable<any>{
    const requestOptions = this.createRequestOptions();
    const cartId = sessionStorage.getItem('cartId');
    //return this.http.delete<Cart>(this.url+"/deleteCart/"+cartId);
    return this.http.delete(`${this.url}/deleteCart/${cartId}`,requestOptions);
   }

   createCart():Observable<any>{
    const requestOptions = this.createRequestOptions();
    //return this.http.post<Cart>(this.url+"/addCart",{});
    return this.http.post(`${this.url}/addCart`, requestOptions);
   }

   




   



   

}
