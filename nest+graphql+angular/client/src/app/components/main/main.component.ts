import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {  takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  
  public userLogged: User;

  //private
  private unsubscribeAll: Subject<any>;
  constructor(private authService: AuthService, private userService: UserService) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.userLogged = this.authService.userLogged;
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  public logout(): void {
    this.authService.logout();
  }
}
