import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { JWTObject } from '../model/jwtObject';
import jwtDecode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class JwtServiceService {
  jwtToken!: string;
  decodedToken!: JWTObject;

  constructor(private localStorageService:LocalStorageService) {
   this.setToken(sessionStorage.getItem("token")?<string>sessionStorage.getItem("token"):null);
  //  this.setCartId()
    // console.log(this.jwtToken)
  }

  setToken(token: string|null) {
    if (token) {
      this.jwtToken = token;
    }
  }

  decodeToken() {
    if (this.jwtToken) {
      this.decodedToken = jwtDecode(this.jwtToken);
      // console.log(this.decodedToken);
    }
  }



  getDecodeToken() :JWTObject{
    return jwtDecode(this.jwtToken);
  }

  getUser() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.sub : null;
  }

  getRole(){
    return sessionStorage.getItem('role');
  }
  // getRole(){
  //   return this.getDecodeToken().role;
  // }
  isCustomer(){
    return this.getRole? this.getRole() === "User":false;
  }

  isAdmin(){
    return this.getRole? this.getRole() === "Admin":false;
  }




  getCartId(){
    this.decodeToken();
    return this.decodedToken? this.decodedToken.cartId? this.decodedToken.cartId:null:null;
  }
  
  // getId(){
  //   this.decodeToken();
  //   return this.decodedToken? this.decodedToken.id? this.decodedToken.id:null:null;
  // }

  // isUser(){
  //   this.decodeToken();
  //   return this.decodedToken? this.decodedToken.role === "ROLE_USER":false;
  // }

  // getEmailId() {
  //   this.decodeToken();
  //   return this.decodedToken ? this.decodedToken.sub : null;
  // }

  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.exp : null;
  }

  isTokenExpired(): boolean {
    const expiryTime: number|null = this.getExpiryTime();
    if (expiryTime) {
      return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
    } else {
      return false;
    }
  }
}


