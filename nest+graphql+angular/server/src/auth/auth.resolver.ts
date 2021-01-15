import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { Public } from '../properties'
import { UserDTO } from '../users/models/user.dto'
import { AuthService } from './auth.service'
import { LoginDTO } from './models/login.dto'

@Resolver('Login')
export class AuthResolver {
  constructor (private readonly authService: AuthService) { }

  @Mutation()
  @Public()
  async login (@Args('loginUserInput') login: LoginDTO): Promise<UserDTO> {
    return await this.authService.login(login)
  }
}
