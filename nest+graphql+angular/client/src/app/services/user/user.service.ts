import { Injectable } from '@angular/core';
import { ApolloQueryResult, FetchResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { User } from 'src/app/models';
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: Array<User> = [];

  private readonly FETCH_USER_QUERY = gql`
    query FetchUser($email: String!){  
      user(email: $email){
        id
        firstName
        lastName
        email
        password
        isActive      
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
        password
        isActive
      }
    }`;

  constructor(private apollo: Apollo) {
    // apollo.watchQuery({
    //   query: gql`
    //   query getUsers{
    //     id
    //     firstName
    //     lastName
    //     email
    //     isActive
    //   }
    //   `
    // }).valueChanges.subscribe((res)=> console.log(res));
   }

  public fetchUsers(params?: any): Array<User> {
    return this.users;
  }

  public createUser(createUserInput: User): Observable<FetchResult<User>> {
    return this.apollo.mutate({
      mutation: this.CREATE_USER_QUERY,
      variables: {
        createUserInput
      }
    });
  }

  public fetchUser(email: string): Observable<ApolloQueryResult<{user: User}>> {
    return this.apollo.watchQuery<{user: User}>({
      query: this.FETCH_USER_QUERY,
      variables: {
        email
      }
    }).valueChanges;
  }

}
