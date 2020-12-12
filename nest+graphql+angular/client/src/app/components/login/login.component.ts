import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Login } from 'src/app/models';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  public hasError = false;
  public readonly feedback = 'Email ou Senha incorretos';

  //private
  private unsubscribeAll: Subject<any>;

  constructor(
    private authService: AuthService,
    private route: Router,
    private activatedRoute: ActivatedRoute) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    if (this.authService.isLogged()) this.doNavigate();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  public login(value: Login): void {
    this.authService.doLogin(value)
      .subscribe((canLogin: boolean) => {
        if (canLogin) this.doNavigate();
      }, () => this.hasError = true);
  }

  private async doNavigate(): Promise<void> {
    await this.route.navigate([atob(this.activatedRoute.snapshot.params.to || btoa(''))]);
  }

}
