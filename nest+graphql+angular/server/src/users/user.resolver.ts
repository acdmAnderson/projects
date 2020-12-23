import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CurrentUser, Public } from 'src/properties'
import { BcryptPipe } from 'src/transform/bcrypt.pipe'
import { UserDTO } from './models/user.dto'
import { UserService } from './user.service'

@Resolver('User')
export class UserResolver {
  constructor (private readonly userService: UserService) { }

  @Query()
  async user (@Args('email') email: string): Promise<UserDTO> {
    return await this.userService.findOne(email)
  }

  @Query()
  async whoAmI (@CurrentUser() user: UserDTO): Promise<UserDTO> {
    return await this.userService.findOne(user.email)
  }

  @Query()
  async getUsers (): Promise<UserDTO[]> {
    return await this.userService.findAll()
  }

  @Mutation()
  @Public()
  async createUser (@Args('createUserInput', new BcryptPipe()) user: UserDTO): Promise<UserDTO> {
    return await this.userService.save({ ...user })
  }
}
