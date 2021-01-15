import { Controller, Get, INestApplication, Req, Res } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../../app.module'
import request from 'supertest'
import { Public } from '../../properties'
import { Request, Response } from 'express'
import setupMiddlewares from '../config/middlewares'

describe('CORS Middleware', () => {
  @Controller()
  class TestCorsController {
    @Get('/test_cors')
    @Public()
    async handle (@Req() req: Request, @Res() res: Response): Promise<void> {
      res.send()
    }
  }
  let app: INestApplication
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [TestCorsController]
    }).compile()

    app = moduleFixture.createNestApplication()
    setupMiddlewares(app)
    await app.init()
  })

  afterEach(async () => {
    await app.close()
  })

  test('Should enable CORS', async () => {
    await request(app.getHttpServer())
      .get('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-headers', '*')
      .expect('access-control-allow-methods', '*')
  })
})
