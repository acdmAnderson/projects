import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  public changePasswordForm: FormGroup;
  public hasError = false;
  public readonly errorMessage = 'Senhas diferentes!'

  constructor() { }


  ngOnInit(): void {
    this.changePasswordForm = new FormGroup({
      password: new FormControl(null, [Validators.required]),
      checkPassword: new FormControl(null, [Validators.required])
    })
  }

  ngOnDestroy(): void { }

  public change({ password, checkPassword }): void {
    if (password !== checkPassword) {
      this.hasError = true;
    }
    console.log(password, checkPassword);
  }

}

