import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { User } from 'src/app/models';
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: Array<User> = [];

  constructor(private apollo: Apollo) { }

  public fetchUsers(params?: any): Array<User> {
    return this.users;
  }

  public createUser(user: User): any {
    this.users.push(user);
  }

  public watchQuery(): Observable<ApolloQueryResult<unknown>> {
    return this.apollo.watchQuery({
      query: gql`
      {
        rates(currency: "USD"){
          currency
          rate
        }
      }
      `
    }).valueChanges;
  }

}
