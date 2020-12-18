import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from 'src/users/user.service';

@Injectable()
export class PasswordService {

    private readonly SUBJECT = 'Recuperação de Senha - GitHub Projects'

    constructor(private readonly mailerService: MailerService, private readonly userService: UserService) { }

    public sendRecoveryMail(email: string): Observable<{ completed: boolean }> {
        return new Observable((observer) => {
            this.mailerService
                .sendMail({
                    to: email,
                    from: process.env.USER_MAILER,
                    subject: this.SUBJECT,
                    template: 'index', // The `.pug` or `.hbs` extension is appended automatically.
                    context: {  // Data to be sent to template engine.
                        link: 'http://localhost:4200/change/password',
                    },
                })
                .then((success) => {
                    console.log("SUCCESS => ", success);
                    observer.next({ completed: true });
                    observer.complete();
                })
                .catch((err) => {
                    console.log("ERROR => ", err);
                    observer.next({ completed: false });
                    observer.complete();
                });
        })
    }
}
