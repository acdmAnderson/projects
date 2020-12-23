import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { Public } from 'src/properties'
import { UserDTO } from 'src/users/models/user.dto'
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
