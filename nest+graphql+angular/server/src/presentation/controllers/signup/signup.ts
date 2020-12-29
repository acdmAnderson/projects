import { AddAccount } from 'src/domain/usecases/add-account'
import { Controller, HttpResponse, HttpRequest, EmailValidator } from './signup-contracts'
import { InvalidFieldError, MissingFieldError } from '../../error'
import { badRequest, serverError } from '../../helpers/http.helper'

export class SingUpResolver implements Controller {
  private readonly requiredFields = ['firstName', 'lastName', 'email', 'password']
  constructor (private readonly emailValidator: EmailValidator, private readonly addAccount: AddAccount) {

  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      for (const field of this.requiredFields) {
        if (!httpRequest.body[field]) return badRequest(new MissingFieldError(field))
      }
      const { email, firstName, lastName, password } = httpRequest.body
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) return badRequest(new InvalidFieldError('email'))
      this.addAccount.add({
        email,
        firstName,
        lastName,
        password
      })
    } catch (error) {
      return serverError()
    }
  }
}
