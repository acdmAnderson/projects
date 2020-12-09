import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from 'src/users/models/user.dto';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {

    constructor(private userService: UserService, private jwtService: JwtService) { }

    public async validateUser(email: string, password: string): Promise<UserDTO> {
        const user = await this.userService.findOne(email);
        if (!user && user?.password !== password) {
            return null;
        }
        return user;
    }

    public async login({ email, password }): Promise<any> {
        const user = await this.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        const { firstName, lastName, id } = user;
        return {
            access_token: this.jwtService.sign({ firstName, lastName, email, id }),
        }
    }
}
