import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FetchResult, Observable } from '@apollo/client/core';
import { first } from 'rxjs/operators';
import { Login, User } from 'src/app/models';
import { AuthToken } from 'src/app/models/token.model';
import { UserService } from '../user/user.service';
import * as JwtDecode from 'jwt-decode';
import { AUTH_TOKEN } from 'src/properties';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly router: Router, private readonly userService: UserService) { }

  public doLogin(login: Login): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.userService
        .login(login)
        .pipe((first()))
        .subscribe((res: FetchResult<AuthToken>) => {
          const { login } = res.data;
          this.storageSession(login);
          console.log(this.userLogged);
          observer.next(true);
          observer.complete();
        }, (error: any) => {
          observer.error(error);
          observer.complete();
        });
    });
  }

  private decodeToken({ access_token }): User {
    return JwtDecode.default(access_token);
  }
  private storageSession({ access_token }): void {
    localStorage.setItem(AUTH_TOKEN, JSON.stringify(access_token));
  }

  public isLogged(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      observer.next(this.storegeToken ? true : false);
      observer.complete();
    });
  }

  public get storegeToken(): string{
    return JSON.parse(localStorage.getItem(AUTH_TOKEN));
  }

  public handleRoute(path: string): void {
    this.router.navigate(['/login', btoa(path)]);
  }

  public logout(): void {
    localStorage.removeItem(AUTH_TOKEN);
    this.handleRoute('/login');
  }

  public get userLogged(): User{
    return this.decodeToken({access_token: this.storegeToken});
  }
}
