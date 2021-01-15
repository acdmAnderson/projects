import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Observable } from 'rxjs'
import { UserService } from '../users/user.service'

@Injectable()
export class PasswordService {
  private readonly SUBJECT = 'Recuperação de Senha - GitHub Projects'

  constructor (
    private readonly mailerService: MailerService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  public sendRecoveryMail (email: string): Observable<{ completed: boolean }> {
    return new Observable((observer) => {
      this.createPasswordRecoveryToken(email)
        .then((value: { token: string }) => {
          if (value) {
            this.send(email, value.token)
              .then(() => {
                observer.next({ completed: true })
                observer.complete()
              })
              .catch(() => {
                observer.next({ completed: false })
                observer.complete()
              })
          } else {
            observer.next({ completed: false })
            observer.complete()
          }
        }).catch(() => {
          observer.next({ completed: false })
          observer.complete()
        })
    })
  }

  private async createPasswordRecoveryToken (email: string): Promise<{ token: string }> {
    const user = await this.userService.findOne(email)
    if (user?.isActive) {
      return { token: this.jwtService.sign({ user }) }
    }
    return null
  }

  private async send (email: string, token: string): Promise<void> {
    return await this.mailerService
      .sendMail({
        to: email,
        from: process.env.USER_MAILER,
        subject: this.SUBJECT,
        template: 'index', // The `.pug` or `.hbs` extension is appended automatically.
        context: { // Data to be sent to template engine.
          link: `http://localhost:4200/change/password?token=${token}`
        }
      })
  }
}
