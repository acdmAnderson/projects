import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public userLogged: User;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userLogged = this.authService.userLogged;
  }

  public logout(): void {
    this.authService.logout();
  }
}
