import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login, User } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users: Array<User> = [];
  constructor(private router: Router) {
    this.users.push({
      firstName: 'teste',
      lastName: 'dois',
      email: '',
      isActive: true,
      password: 'master'
    })
  }

  public doLogin(login: Login): boolean {
    const user: User = this.users.find((user: User) => user.firstName === login.username);
    if (!user) return false;
    this.cacheUser(user.firstName);
    return user.password.includes(login.password);
  }

  private cacheUser(username: string): void {
    localStorage.setItem('username', JSON.stringify(username));
  }

  public isLogged(): boolean {
    const username = JSON.parse(localStorage.getItem('username'));
    return this.users.some((user: User) => user.firstName === username);
  }

  public handleRoute(path: string): void {
    this.router.navigate(['/login', btoa(path)]);
  }

  public logout(): void {
    localStorage.removeItem('username');
    this.handleRoute('/login');
  }
}
