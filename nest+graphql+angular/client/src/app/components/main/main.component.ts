import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  public logout(): void{
    this.authService.logout();
  }
}
