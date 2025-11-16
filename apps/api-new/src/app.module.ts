import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AttendeesModule } from './attendees/attendees.module';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { JwtModule } from "@nestjs/jwt"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>("DB_HOST"),
        port: configService.get<number>("DB_PORT"),
        username: configService.get<string>("DB_USER"),
        password: configService.get<string>("DB_PASS"),
        database: configService.get<string>("DB_NAME"),
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
        ]
      })
    }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,

      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: '1d'
        }
      }),
    }),

    AttendeesModule,
    UsersModule,
    CommonModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
