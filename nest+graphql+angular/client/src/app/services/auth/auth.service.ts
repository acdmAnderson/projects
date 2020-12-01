import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login, User } from 'src/app/models';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userLogged: User;
  private readonly STORAGE_KEY = 'email';
  constructor(private readonly router: Router, private readonly userService: UserService) { }

  public doLogin(login: Login): boolean {
    const user: User = this.userService.fetchUsers().find((user: User) => user.firstName === login.username);
    if (!user) return false;
    const canLogin = user.password.includes(login.password);
    if (canLogin) {
      this.cacheUser(user.email);
      this.userLogged = user;
    }
    return canLogin;
  }

  private cacheUser(email: string): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(email));
  }

  public isLogged(): boolean {
    const email = JSON.parse(localStorage.getItem(this.STORAGE_KEY));
    return this.userService.fetchUsers().some((user: User) => user.email === email);
  }

  public handleRoute(path: string): void {
    this.router.navigate(['/login', btoa(path)]);
  }

  public logout(): void {
    this.userLogged = null;
    localStorage.removeItem(this.STORAGE_KEY);
    this.handleRoute('/login');
  }
}
