import { Controller } from '../contracts/controller'
import { HttpRequest, HttpResponse } from '../contracts/http'
import { MissingFieldError } from '../error/missing-field.error'
import { badRequest } from '../helpers/http.helper'

export class SingUpResolver implements Controller {
  private readonly requiredFields = ['fistName', 'lastName', 'email', 'password']
  handle (httpRequest: HttpRequest): HttpResponse {
    for (const field of this.requiredFields) {
      if (!httpRequest.body[field]) return badRequest(new MissingFieldError(field))
    }
  }
}
