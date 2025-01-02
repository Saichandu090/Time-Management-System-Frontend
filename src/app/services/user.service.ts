import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LogOut, UserLogin, UserRegister } from '../models/classes/user';
import { IJsonResponse, ILoggedInUser } from '../models/interfaces/response';
import { Observable, Subject } from 'rxjs';
import { Constant } from '../constants/constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http: HttpClient = inject(HttpClient);

  onSessionChange: Subject<boolean> = new Subject<boolean>();

  baseURL: string = 'http://localhost:8080/';

  getHeaders(): HttpHeaders {
    let token = localStorage.getItem(Constant.LOGIN_TOKEN);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return headers;
  }

  onLogin(loginObj: UserLogin): Observable<IJsonResponse> {
    return this.http.post<IJsonResponse>(this.baseURL + 'login', loginObj);
  }

  onRegister(registerObj: UserRegister): Observable<IJsonResponse> {
    return this.http.post<IJsonResponse>(this.baseURL + 'register', registerObj);
  }

  onLogOut(obj: LogOut): Observable<IJsonResponse> {
    const headers = this.getHeaders();
    return this.http.delete<IJsonResponse>(`${this.baseURL}logout/${obj.loginId}`, { headers });
  }

  onPauseTimer(obj: LogOut): Observable<IJsonResponse> {
    const headers = this.getHeaders();
    return this.http.put<IJsonResponse>(`${this.baseURL}pause`, obj, { headers });
  }

  onPlayTimer(obj: LogOut): Observable<IJsonResponse> {
    const headers = this.getHeaders();
    return this.http.put<IJsonResponse>(`${this.baseURL}play`, obj, { headers });
  }

  getAllSessions(): Observable<IJsonResponse> {
    const headers = this.getHeaders();
    return this.http.get<IJsonResponse>(this.baseURL + 'getUserSessions', { headers });
  }

  deleteSession(sessionId: number): Observable<IJsonResponse> {
    const headers = this.getHeaders();
    return this.http.delete<IJsonResponse>(`${this.baseURL}deleteSession/${sessionId}`, { headers });
  }
}
