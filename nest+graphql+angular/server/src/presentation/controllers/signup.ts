export class SingUpResolver {
  handle (httpRequest: any): any {
    return {
      statusCode: 400,
      body: new Error('Field fistName shold be prodided')
    }
  }
}
