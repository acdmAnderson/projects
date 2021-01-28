import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'
import { UserModule } from './users/user.module'
import { AuthModule } from './auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { PasswordModule } from './password/password.module'
import { UtilsModule } from './utils/utils.module'
import { PresentationModule } from './presentation/presentation.module'
import { DataModule } from './data/data.module'

@Module({
  imports: [
    UserModule,
    AuthModule,
    PasswordModule,
    ConfigModule.forRoot(
      {
        isGlobal: true,
        envFilePath: ['development.env']
      }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get('DATABASE'),
        entities: [join(__dirname, 'entities/*.entity{.ts,.js}')],
        migrations: [join(__dirname, 'migrations/*.migration{.ts,.js}')],
        synchronize: true,
        autoLoadEntities: true,
        cli: {
          migrationsDir: join(__dirname, 'migrations'),
          entitiesDir: join(__dirname, 'entities')
        },
        logging: true
      }),
      inject: [ConfigService]
    }),
    GraphQLModule.forRoot({
      debug: false,
      typePaths: ['./**/*.graphql']
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('HOST_MAILER'),
          port: configService.get('PORT_MAILER'),
          secure: false, // upgrade later with STARTTLS
          auth: {
            user: configService.get('USER_MAILER'),
            pass: configService.get('PASS_MAILER')
          }
        },
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>'
        },
        template: {
          dir: process.cwd() + '/templates/',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true
          }
        }
      }),
      inject: [ConfigService]
    }),
    UtilsModule,
    PresentationModule,
    DataModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class AppModule { }
