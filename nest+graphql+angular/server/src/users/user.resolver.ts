import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserDTO } from './models/user.dto';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
    constructor(private userService: UserService) { }

    @Query()
    async user(@Args('email') email: string): Promise<UserDTO> {
        return this.userService.findOne(email);
    }

    @Query()
    async getUsers(): Promise<Array<UserDTO>> {
        return this.userService.findAll();
    }

    @Mutation()
    async createUser(@Args('createUserInput') user: UserDTO): Promise<UserDTO> {        
        return this.userService.save({...user});
    }
   
}
