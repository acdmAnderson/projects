import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { Public } from '../properties'
import { PasswordService } from './password.service'

@Resolver('Password')
export class PasswordResolver {
  constructor (private readonly passwordService: PasswordService) { }

  @Mutation()
  @Public()
  async send (@Args('email') email: string): Promise<{ completed: boolean }> {
    return await this.passwordService.sendRecoveryMail(email).toPromise()
  }
}
