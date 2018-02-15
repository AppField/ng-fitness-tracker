import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private user: User;
  authChange = new Subject<boolean>();

  constructor(private router: Router) {
  }

  registerUser(authData: AuthData) {
    this.user = {
      email: 'test@test.com',
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authChange.next(true);
    this.authSuccessfully();
  }

  login(authData: AuthData) {
    this.user = {
      email: 'test@test.com',
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authChange.next(true);
    this.authSuccessfully();
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['login']);
  }

  isAuth(): boolean {
    return this.user == null;
  }

  private getUser(): User {
    return { ...this.user };
  }

  private authSuccessfully(): void {
    this.router.navigate(['training']);
  }
}
