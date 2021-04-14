import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from '../models/auth-data.model';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {
  public isLoggedInStatus = new Subject<boolean>();
  private user: User;

  constructor(private router: Router) {}

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.authSuccess();
  }

  loginUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.authSuccess();
  }

  logoutUser() {
    this.user = null;
    this.isLoggedInStatus.next(false);
    this.router.navigate(['/'])
  }

  getUser() {
    return { ...this.user };
  }

  isLoggedIn() {
    return this.user != null;
  }

  private authSuccess() {
    this.isLoggedInStatus.next(true);
    this.router.navigate(['/training']);
  }
}
