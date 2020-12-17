import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent  implements OnInit, OnDestroy {

  public recoverForm: FormGroup;

  constructor(private readonly router: Router) { }


  ngOnInit(): void {
    this.recoverForm = new FormGroup({
      email: new FormControl(null, [Validators.required])
    })
  }

  ngOnDestroy(): void { }

  public recover({ email }): void {
    console.log(email);
  }

  public cancel(): void {
    this.redirectToLogin()
  }

  private redirectToLogin(): void {
    this.router.navigate(['/login']);
  }

}
