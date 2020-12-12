import { Injectable } from '@angular/core';
import { ApolloQueryResult, FetchResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { Login, User } from 'src/app/models';
import { Observable } from 'rxjs'
import { AuthToken } from 'src/app/models/token.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly LOGIN = gql`
    mutation Login($loginUserInput: LoginUserInput!){  
      login(loginUserInput: $loginUserInput){
        access_token
      }    
    }`;

  private readonly CREATE_USER_QUERY = gql`
    mutation CreateUser(
        $createUserInput: CreateUserInput!
      ){
      createUser(createUserInput: $createUserInput){
        id
        firstName
        lastName
        email
        isActive
      }
    }`;

  constructor(private readonly apollo: Apollo) { }

  public createUser(createUserInput: User ): Observable<FetchResult<User>> {
    return this.apollo.mutate({
      mutation: this.CREATE_USER_QUERY,
      variables: {
        createUserInput
      }
    });
  }

  public login(loginUserInput: Login): Observable<FetchResult<AuthToken>> {
    return this.apollo.mutate<AuthToken>({
      mutation: this.LOGIN,
      variables: {
        loginUserInput
      }
    });
  }

}
