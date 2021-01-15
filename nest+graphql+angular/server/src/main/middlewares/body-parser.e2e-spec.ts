import { Controller, INestApplication, Post, Req, Res } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../../app.module'
import request from 'supertest'
import { Public } from '../../properties'
import { Request, Response } from 'express'
import setupMiddlewares from '../config/middlewares'

describe('Body Parser Middleware', () => {
  @Controller()
  class TestBodyParserController {
    @Post('/test_body_parser')
    @Public()
    async handle (@Req() req: Request, @Res() res: Response): Promise<void> {
      res.send(req.body)
    }
  }
  let app: INestApplication
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [TestBodyParserController]
    }).compile()

    app = moduleFixture.createNestApplication(null, { bodyParser: false })
    setupMiddlewares(app)
    await app.init()
  })
  test('Should parse body as json', async () => {
    await request(app.getHttpServer())
      .post('/test_body_parser')
      .send({ name: 'Anderson' })
      .expect({ name: 'Anderson' })
  })
})
