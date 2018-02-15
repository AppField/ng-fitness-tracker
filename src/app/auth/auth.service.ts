import { User } from './user.model';
import { AuthData } from './auth-data.model';


export class AuthService {
  private user: User;

  registerUser(authData: AuthData) {
    // this.user = {
    //   email: 'test@test.com',
      // userId: Math.round(Math.random * 10000).toString()
    // };
  }

  login(authData: AuthData) {
    this.user = {
      email: 'test@test.com',
      userId: Math.round(<any>Math.random * 10000).toString()
    };
  }

  logoud() {
    this.user = null;
  }

  // private getUser(): User {
    // return { ...this.user };
  // }

  isAuth(): boolean {
    return this.user == null;
  }

}
