import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient){

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

  url="http://localhost:8080/registration";

  signin(data : any ):Observable<any>{

   return this.http.post(`${this.url}/signin`,data);

  }

  getProfile(){
    const user=sessionStorage.getItem("username");
    const requestOptions = this.createRequestOptions();
    return this.http.get(`${this.url}/authorization/getbyUsername/`+user,requestOptions);
  }

  updateProfile(data:any){
    const user=sessionStorage.getItem("username");
    const requestOptions = this.createRequestOptions();
    return this.http.put(`${this.url}/authorization/updatetheusername/`+user,data,requestOptions);
  }

  updatePassword(data:any){
    const user=sessionStorage.getItem("username");
    const requestOptions = this.createRequestOptions();
    return this.http.put(`${this.url}/authorization/updatePassword/`+user,data,requestOptions);
  }

  getAllUsers(){
    const requestOptions = this.createRequestOptions();
    return this.http.get(`${this.url}/authorization/getAllUsers`,requestOptions); 
  }

  showuserdetails(data:any):Observable<any>
  {
      // const requestOptions = this.createRequestOptions();
       const user=sessionStorage.getItem("username");
      return this.http.get(`${this.url}/authorization/getbyUsername/`+user, data);
  }

}
