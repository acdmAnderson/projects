import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/models';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private route: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    if (this.authService.isLogged()) this.doNavigate();
  }

  public login(value: Login): void {
    const canLogin = this.authService.doLogin(value)
    if (canLogin) {
      this.doNavigate();
    }
  }

  private async doNavigate(): Promise<void> {
    await this.route.navigate([atob(this.activatedRoute.snapshot.params.to || btoa('')) ]);
  }

}
