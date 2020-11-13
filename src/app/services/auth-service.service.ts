import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  private loggedIn = new BehaviorSubject<boolean>(false);
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }
  isAuthenticated(){
    let userData =  localStorage.getItem('user');
    if (userData)
    return true
    else
    return false
  }

  login(email, password) {
    let role = "admin"
    return this.http.post<User>(`${environment.URL}/login-admin`, { email, password ,role})
      .pipe(map(user => {
        this.loggedIn.next(true);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  register(user) {
    return this.http.post(`${environment.URL}/register`, user);
  }

}
