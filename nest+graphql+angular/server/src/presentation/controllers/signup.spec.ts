import { SingUpResolver } from './signup'

describe('Sign Up Resolver', () => {
  test('Shold return an 400 if no fistName is provided', () => {
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
    expect(httpResponse.body).toEqual(new Error('Field fistName shold be prodided'))
  })

  test('Shold return an 400 if no lastName is provided', () => {
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
    expect(httpResponse.body).toEqual(new Error('Field lastName shold be prodided'))
  })
})
