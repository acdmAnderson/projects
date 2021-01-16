import { INestApplication } from '@nestjs/common'
import { bodyParser, cors, contentType } from '../middlewares'
export default (app: INestApplication): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}
