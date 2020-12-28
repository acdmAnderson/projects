import { HttpResponse } from '../contracts/http'
import { ServerError } from '../error'

export const badRequest = (error: Error): HttpResponse => (
  {
    statusCode: 400,
    body: error
  }
)

export const serverError = (): HttpResponse => (
  {
    statusCode: 500,
    body: new ServerError()
  }
)
