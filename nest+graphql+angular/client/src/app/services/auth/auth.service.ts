import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FetchResult, Observable } from '@apollo/client/core';
import { first } from 'rxjs/operators';
import { Login, User } from 'src/app/models';
import { AuthToken } from 'src/app/models/token.model';
import { UserService } from '../user/user.service';
import * as JwtDecode from 'jwt-decode';
import { AUTH_TOKEN } from 'src/properties';
import { UserToken } from 'src/app/models/user.model';

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
          observer.next(true);
          observer.complete();
        }, (error: any) => {
          observer.error(error);
          observer.complete();
        });
    });
  }

  private decodeToken({ access_token }): UserToken {
    return JwtDecode.default(access_token);
  }

  private storageSession({ access_token }): void {
    localStorage.setItem(AUTH_TOKEN, JSON.stringify(access_token));
  }

  public isLogged():boolean {
    return this.validToken(this.storegeToken);
  }

  private validToken(token: any): boolean {
    if (!token) return false;
    const { exp } = this.decodeToken({ access_token: token });
    return exp <= Date.now();
  }

  public get storegeToken(): any {
    const token = localStorage.getItem(AUTH_TOKEN);
    if (!token) return null;
    return token;
  }

  public handleRoute(path: string): void {
    this.router.navigate(['/login', btoa(path)]);
  }

  public logout(): void {
    localStorage.removeItem(AUTH_TOKEN);
    this.handleRoute('/login');
  }

  public get userLogged(): User {
    return this.decodeToken({ access_token: this.storegeToken });
  }
}
