import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

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

 // restaurantId = sessionStorage.getItem('restaurantId');
  url="http://localhost:8080/registration/authorization"
  


  //restaurant service
  addRestaurant(data : any ):Observable<any>{
    const requestOptions = this.createRequestOptions();
    return this.http.post(`${this.url}/addRestaurant`, data, requestOptions);
   }

   viewAllRestaurants():Observable<any>{
    return this.http.get(`${this.url}/viewAllRestaurants`);
   }

   viewRestaurantById(restaurantId : string):Observable<any>{
    return this.http.get(`${this.url}/viewRestaurantById/${restaurantId}`);
   }

   deleteRestaurant(restaurantId : string ):Observable<any>{
    const requestOptions = this.createRequestOptions();
    return this.http.delete(`${this.url}/deleteRestaurant/${restaurantId}`, requestOptions);
   }

   viewRestaurantByLocation(location : string ):Observable<any>{
    const requestOptions = this.createRequestOptions();
    return this.http.get(`${this.url}/viewRestaurantsByLocation/${location}`, requestOptions);
   }

   viewRestaurantByName(name : string ):Observable<any>{
    const requestOptions = this.createRequestOptions();
    return this.http.get(`${this.url}/viewRestaurantsByName/${name}`, requestOptions);
   }

   updateRestaurant(restaurantId:string,data : any ):Observable<any>{
    const requestOptions = this.createRequestOptions();
    return this.http.put(`${this.url}/updateRestaurant/${restaurantId}`, data, requestOptions);
   }
    giveRating(restaurantId:string,rating : any ):Observable<any>{
      const requestOptions = this.createRequestOptions();
      return this.http.put(`${this.url}/giveRating/${restaurantId}/${rating}`, requestOptions);
    }

    //item services

     addItem(data : any ):Observable<any>{
      const requestOptions = this.createRequestOptions();
      return this.http.post(`${this.url}/item/add`, data, requestOptions);
     }

     viewAllItems():Observable<any>{
      return this.http.get(`${this.url}/item/viewAll`);
     }
  
     viewItemById(itemId : string):Observable<any>{
      return this.http.get(`${this.url}/item/viewById/${itemId}`);
     }
  
     deleteItem(itemId : string ):Observable<any>{
      const requestOptions = this.createRequestOptions();
      return this.http.delete(`${this.url}/item/delete/${itemId}`, requestOptions);
     }

     viewItemByName(name : string ):Observable<any>{
      return this.http.get(`${this.url}/item/viewByName/${name}`);
     }
  
     updateItem(itemId:string,data : any ):Observable<any>{
      const requestOptions = this.createRequestOptions();
      return this.http.put(`${this.url}/item/update/${itemId}`, data, requestOptions);
     }

     getItemByrestaurantName(restaurantName : string ):Observable<any>{
      return this.http.get(`${this.url}/item/getItemsByrestaurantName/${restaurantName}`);
     }

}
