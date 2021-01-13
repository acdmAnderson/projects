import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from '../app.module'

export default async function bootstrap (): Promise<void> {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const port = configService.get('PORT')
  await app.listen(port)
}
