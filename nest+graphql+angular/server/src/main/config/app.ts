import { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from '../../app.module'
import setupMiddlewares from './middlewares'

const create = async (): Promise<INestApplication> => {
  const nestApp = NestFactory.create(AppModule, { bodyParser: false })
  const app = await nestApp
  setupMiddlewares(app)
  return app
}

export default create()
