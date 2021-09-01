import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private env: string;

  constructor( private _http : HttpClient, private _router : Router) {
    this.env = environment.APP_URL;
  }

registerUser( user : any ){
  return this._http.post<any>(this.env + 'user/registerUser', user);
}

login( user : any ){
  return this._http.post<any>(this.env + 'user/login', user);
}

loginId(){
  return !!localStorage.getItem('token');
}

getToken(){
  return localStorage.getItem('token');
}

logout(){
  localStorage.removeItem('token')
  this._router.navigate(['/login'])
}

}
