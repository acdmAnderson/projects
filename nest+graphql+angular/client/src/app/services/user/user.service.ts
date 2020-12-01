import { Injectable } from '@angular/core';
import { User } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: Array<User> = [];

  constructor() { }

  public fetchUsers(params?: any): Array<User> {
    return this.users;
  }

  public createUser(user: User): any {
    this.users.push(user);
  }

}
