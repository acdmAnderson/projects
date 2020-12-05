import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/users/current-user.model';
import { UserDTO } from 'src/users/models/user.dto';
import { UserService } from 'src/users/user.service';
import { LocalAuthGuard } from './local-auth.guard';

@Resolver('Login')
export class AuthResolver {
    constructor(private userService: UserService) { }

    @Query()
    @UseGuards(LocalAuthGuard)
    async login(@CurrentUser() user: {email: string, password: string}): Promise<UserDTO> {
        console.log(user.email, user.password);
        return this.userService.findOne(user.email);
    }
}
