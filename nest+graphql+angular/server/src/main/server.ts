import { ConfigService } from '@nestjs/config'
import nestApp from './config/app'

export default async function bootstrap (): Promise<void> {
  const app = await nestApp
  const configService = app.get(ConfigService)
  const port = configService.get('PORT')
  await app.listen(port)
}
