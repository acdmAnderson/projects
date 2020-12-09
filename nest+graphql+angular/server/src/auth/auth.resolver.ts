import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserDTO } from 'src/users/models/user.dto';
import { AuthService } from './auth.service';

@Resolver('Login')
export class AuthResolver {
    constructor(private authService: AuthService) { }

    @Mutation()
    async login(@Args('loginUserInput') user: {email: string, password: string}): Promise<UserDTO> {
        return this.authService.login(user);
    }
}
