import { AddAccount } from 'src/domain/usecases/add-account'
import { Controller, HttpResponse, HttpRequest, EmailValidator } from './signup-contracts'
import { InvalidFieldError, MissingFieldError } from '../../error'
import { badRequest, ok, serverError } from '../../helpers/http.helper'
import { AccountModel } from 'src/domain/models/account'

export class SingUpResolver implements Controller {
  private readonly requiredFields = ['firstName', 'lastName', 'email', 'password']
  constructor (private readonly emailValidator: EmailValidator, private readonly addAccount: AddAccount) {

  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      for (const field of this.requiredFields) {
        if (!httpRequest.body[field]) return badRequest(new MissingFieldError(field))
      }
      const { email, firstName, lastName, password } = httpRequest.body
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) return badRequest(new InvalidFieldError('email'))
      const account = await this.addAccount.add({
        email,
        firstName,
        lastName,
        password
      })
      return ok<AccountModel>(account)
    } catch (error) {
      return serverError()
    }
  }
}
