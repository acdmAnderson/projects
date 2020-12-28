import { MissingFieldError } from '../error/missing-field.error'
import { SingUpResolver } from './signup'

describe('Sign Up Resolver', () => {
  test('Should return an 400 if no fistName is provided', () => {
    const rut = new SingUpResolver()
    const httpRequest = {
      body: {
        lastName: 'any_lastName',
        email: 'any_email',
        password: 'any_password',
        isActive: true
      }
    }
    const httpResponse = rut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingFieldError('fistName'))
  })

  test('Should return an 400 if no lastName is provided', () => {
    const rut = new SingUpResolver()
    const httpRequest = {
      body: {
        fistName: 'any_fistName',
        email: 'any_email',
        password: 'any_password',
        isActive: true
      }
    }
    const httpResponse = rut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingFieldError('lastName'))
  })

  test('Should return an 400 if no email is provided', () => {
    const rut = new SingUpResolver()
    const httpRequest = {
      body: {
        fistName: 'any_fistName',
        lastName: 'any_lastName',
        password: 'any_password',
        isActive: true
      }
    }
    const httpResponse = rut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingFieldError('email'))
  })
})
