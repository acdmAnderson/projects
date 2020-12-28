import { HttpRequest, HttpResponse } from '../contracts/http'

export class SingUpResolver {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.fistName) {
      return {
        statusCode: 400,
        body: new Error('Field fistName shold be prodided')
      }
    }
    if (!httpRequest.body.lastName) {
      return {
        statusCode: 400,
        body: new Error('Field lastName shold be prodided')
      }
    }
  }
}
