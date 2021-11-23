import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public jwtHelper: JwtHelperService,
    public router: Router
  ) { }

  public isAuthenticated(): boolean {
    let status: boolean = false;
    try {
      if (localStorage.getItem('token')) {
        let token = localStorage.getItem('token') || '{}';
        status = !this.jwtHelper.isTokenExpired(token);
      }
    } catch (error) {
      console.log(error);
      status = false;
    }
    return status;
  }

  logOut() {
    localStorage.removeItem("token");
    this.router.navigateByUrl('/usuarios');
  }
}
