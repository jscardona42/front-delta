import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(public jwtHelper: JwtHelperService) { }

  public isAuthenticated(): boolean {
    let status: boolean = false;
    try {
      if (localStorage.getItem('token')) {
        let token = localStorage.getItem('token') || '{}';
        status = !this.jwtHelper.isTokenExpired(token);
        this.loggedIn.next(true);
      }
    } catch (error) {
      console.log(error);
      status = false;
    }
    return status;
  }
}
