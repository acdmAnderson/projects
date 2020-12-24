export class SingUpResolver {
  handle (httpRequest: any): any {
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
