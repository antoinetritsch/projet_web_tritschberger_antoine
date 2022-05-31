import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import User from '../shared/models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}


  public signin(login: string, password: string): Observable<any> {
    let data= new URLSearchParams();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    
    data.set('login',login);
    data.set('password',password);

    return this.http.post<any>('https://projet-tritschberger-antoine.herokuapp.com/api/signin', data.toString(), httpOptions);
  }

  public signup(user:User): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    let data = new URLSearchParams();
    var prop = Reflect.ownKeys(user);
    for(let i=0;i<prop.length;i++){
      data.set(prop[i].toString(),Reflect.get(user,prop[i].toString()));
    }

    return this.http.post<any>('https://projet-tritschberger-antoine.herokuapp.com/api/signup', data.toString(), httpOptions);
  }
}