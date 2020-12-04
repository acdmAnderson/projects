import { Injectable } from '@nestjs/common';
import { UserDTO } from 'src/users/models/user.dto';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {

    constructor(private userService: UserService) { }
    public async validateUser(email: string, password: string): Promise<UserDTO> {
        const user = await this.userService.findOne(email);
        if (!user && user.password !== password) {
            return null;
        }
        return user;
    }
}
