import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { RoomModule } from './room/room.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { DiagramModule } from './diagram/diagram.module';
import { DiagramGateway } from './diagram/diagram.gateway';
import { AuthModule } from './auth/auth.module';
import { InviteService } from './invite/invite.service';
import { InviteModule } from './invite/invite.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: process.env.NODE_ENV === 'production'
          ? configService.get<string>('MONGODB_URI_PROD')
          : configService.get<string>('MONGODB_URI_DEV'),
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      path: '/graphql',
    }),
    AuthModule,
    UserModule,
    RoomModule,
    DiagramModule,
    InviteModule,
  ],
  controllers: [AppController],
  providers: [AppService, DiagramGateway, InviteService],
})
export class AppModule { }
