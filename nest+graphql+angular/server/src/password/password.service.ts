import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from 'src/users/user.service';

@Injectable()
export class PasswordService {

    constructor(private readonly mailerService: MailerService, private readonly userService: UserService) { }

    public sendRecoveryMail(): Observable<{ completed: boolean }> {
        return new Observable((observer) => {
            this.mailerService
                .sendMail({
                    to: 'test@nestjs.com',
                    from: 'rosa38@ethereal.email',
                    subject: 'Testing Nest Mailermodule with template ✔',
                    template: 'index', // The `.pug` or `.hbs` extension is appended automatically.
                    context: {  // Data to be sent to template engine.
                        link: 'http://localhost:4200/change/password',
                    },
                })
                .then(() => {
                    observer.next({ completed: true });
                    observer.complete();
                })
                .catch(() => {
                    observer.next({ completed: false });
                    observer.complete();
                });
        })
    }
}
