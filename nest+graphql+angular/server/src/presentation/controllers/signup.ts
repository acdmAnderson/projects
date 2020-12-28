import { HttpRequest, HttpResponse } from '../contracts/http'
import { MissingFieldError } from '../error/missing-field.error'

export class SingUpResolver {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.fistName) {
      return {
        statusCode: 400,
        body: new MissingFieldError('fistName')
      }
    }
    if (!httpRequest.body.lastName) {
      return {
        statusCode: 400,
        body: new MissingFieldError('lastName')
      }
    }
  }
}
