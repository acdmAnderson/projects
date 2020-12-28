import { HttpRequest, HttpResponse } from '../contracts/http'
import { MissingFieldError } from '../error/missing-field.error'
import { badRequest } from '../helpers/http.helper'

export class SingUpResolver {
  private readonly requiredFields = ['fistName', 'lastName', 'email']
  handle (httpRequest: HttpRequest): HttpResponse {
    for (const field of this.requiredFields) {
      if (!httpRequest.body[field]) return badRequest(new MissingFieldError(field))
    }
  }
}
