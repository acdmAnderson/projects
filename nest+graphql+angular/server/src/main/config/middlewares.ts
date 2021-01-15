import { INestApplication } from '@nestjs/common'
import { bodyParser } from '../middlewares/body-parser'
export default (app: INestApplication): void => {
  app.use(bodyParser)
}
