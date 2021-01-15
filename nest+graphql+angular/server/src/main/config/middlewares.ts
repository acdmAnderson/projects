import { INestApplication } from '@nestjs/common'
import { bodyParser } from '../middlewares/body-parser'
import { cors } from '../middlewares/cors'
export default (app: INestApplication): void => {
  app.use(bodyParser)
  app.use(cors)
}
