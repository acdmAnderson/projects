import { HttpRequest, HttpResponse } from '../contracts/http'
import { MissingFieldError } from '../error/missing-field.error'
import { badRequest } from '../helpers/http.helper'

export class SingUpResolver {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.fistName) {
      return badRequest(new MissingFieldError('fistName'))
    }
    if (!httpRequest.body.lastName) {
      return badRequest(new MissingFieldError('lastName'))
    }
  }
}
