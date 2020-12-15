import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { LoginDTO } from 'src/auth/models/login.dto';
import { UserDTO } from 'src/users/models/user.dto';
import * as bcript from 'bcrypt';
@Injectable()
export class BcryptPipe implements PipeTransform {

  private readonly SALT_ROUNDS = 10

  transform(value: UserDTO | LoginDTO, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      const { password } = value;
      const salt = bcript.genSaltSync(this.SALT_ROUNDS);
      value = { ...value, password: bcript.hashSync(password, salt) }
    }
    return value;
  }


}
