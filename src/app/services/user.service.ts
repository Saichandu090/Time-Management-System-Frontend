import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserLogin, UserRegister } from '../models/classes/user';
import { IJsonResponse } from '../models/interfaces/response';
import { Observable } from 'rxjs';
import { Constant } from '../constants/constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http:HttpClient=inject(HttpClient);

  baseURL:string='http://localhost:8080/';

  onLogin(loginObj:UserLogin):Observable<IJsonResponse>{
    let token = localStorage.getItem(Constant.LOGIN_TOKEN);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post<IJsonResponse>(this.baseURL+'login',loginObj);
  }

  onRegister(registerObj:UserRegister):Observable<IJsonResponse>{
    let token = localStorage.getItem(Constant.LOGIN_TOKEN);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post<IJsonResponse>(this.baseURL+'register',registerObj);
  }
}
