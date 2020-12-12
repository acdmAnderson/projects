import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FetchResult } from '@apollo/client/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  public registerForm: FormGroup;

  //private
  private unsubscribeAll: Subject<any>;
  constructor(private readonly router: Router, private readonly userService: UserService) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  public createUser(user: User): void {
    this.userService
      .createUser(user)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((res: FetchResult<User>) => {
        console.log(res.data);
        this.redirectToLogin();
      }, (error: any) => {
        console.log(error);
      });
  }

  public cancel(): void {
    this.redirectToLogin()
  }

  private redirectToLogin(): void {
    this.router.navigate(['/login']);
  }

}
