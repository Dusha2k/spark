import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entities/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { MessageModule } from './message/message.module';
import { ChannelModule } from './channel/channel.module';
import { MessageEntity } from './message/entities/message.entity';
import { ChannelEntity } from './channel/entities/channel.entity';
import { GatewayModule } from './gateway/gateway.module';
import { LocalFileModule } from './local-file/local-file.module';
import { LocalFileEntity } from './local-file/entities/local-file.entity';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: 'spark',
      entities: [UserEntity, MessageEntity, ChannelEntity, LocalFileEntity],
      synchronize: true,
    }),
    MulterModule.register({
      storage: memoryStorage(),
    }),
    AuthModule,
    UserModule,
    MessageModule,
    ChannelModule,
    GatewayModule,
    LocalFileModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
