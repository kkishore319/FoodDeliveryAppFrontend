import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) {

   }

   url="http://localhost:8080/register";

   addUser(data : any ):Observable<any>{

    return this.http.post(`${this.url}/addUser`,data);

   }

}
