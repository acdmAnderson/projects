import { EmailValidator } from '../contracts'
import { Controller } from '../contracts/controller'
import { HttpRequest, HttpResponse } from '../contracts/http'
import { InvalidFieldError, MissingFieldError, ServerError } from '../error'
import { badRequest } from '../helpers/http.helper'

export class SingUpResolver implements Controller {
  private readonly requiredFields = ['fistName', 'lastName', 'email', 'password']
  constructor (private readonly emailValidator: EmailValidator) {

  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      for (const field of this.requiredFields) {
        if (!httpRequest.body[field]) return badRequest(new MissingFieldError(field))
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) return badRequest(new InvalidFieldError('email'))
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }
  }
}
