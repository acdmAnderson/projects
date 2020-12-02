import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloQueryResult, Observable } from '@apollo/client/core';
import { first } from 'rxjs/operators';
import { Login, Response, User } from 'src/app/models';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userLogged: User;
  private readonly STORAGE_KEY = 'email';
  constructor(private readonly router: Router, private readonly userService: UserService) { }

  public doLogin(login: Login): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.userService
        .fetchUser(login.email)
        .pipe((first()))
        .subscribe((res: ApolloQueryResult<{ user: User }>) => {
          const { user } = res.data;
          const canLogin = user.password.includes(login.password);
          if (canLogin) {
            this.cacheUser(user.email);
            this.userLogged = user;
          }
          observer.next(canLogin);
          observer.complete();
        });
    });
  }

  private cacheUser(email: string): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(email));
  }

  public isLogged(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      const email = JSON.parse(localStorage.getItem(this.STORAGE_KEY));
      if (email) {
        this.userService
          .fetchUser(email)
          .pipe((first()))
          .subscribe((res: ApolloQueryResult<{ user: User }>) => {
            console.log(res, email)
            const { user } = res.data;
            if (user) {
              this.cacheUser(user.email);
              this.userLogged = user;
              observer.next(true);
              observer.complete();
            }
            observer.next(false);
            observer.complete();
          });
      } else {
        observer.next(false);
        observer.complete();
      }
    });
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
