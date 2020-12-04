import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
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
        logging: true,
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      debug: false,
     typePaths: ['./**/*.graphql']
    }),
  ],
  providers: [],
})
export class AppModule { }
