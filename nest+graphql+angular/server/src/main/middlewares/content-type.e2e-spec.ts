import { Controller, Get, Header, INestApplication, Req, Res } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../../app.module'
import request from 'supertest'
import { Public } from '../../properties'
import { Request, Response } from 'express'
import setupMiddlewares from '../config/middlewares'

describe('Content type Middleware', () => {
  @Controller()
  class TestContentTypeController {
    @Get('/test_content_type')
    @Public()
    async handleJson (@Req() req: Request, @Res() res: Response): Promise<void> {
      res.send('')
    }

    @Get('/test_content_type_xml')
    @Public()
    @Header('content-type', 'application/xml')
    async handleXml (@Req() req: Request, @Res() res: Response): Promise<void> {
      res.send('')
    }
  }
  let app: INestApplication
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [TestContentTypeController]
    }).compile()

    app = moduleFixture.createNestApplication()
    setupMiddlewares(app)
    await app.init()
  })

  test('Should return xml content type when forced', async () => {
    await request(app.getHttpServer())
      .get('/test_content_type_xml')
      .expect('content-type', /xml/)
  })

  test('Should return default content type as json', async () => {
    await request(app.getHttpServer())
      .get('/test_content_type')
      .expect('content-type', /json/)
  })
})
