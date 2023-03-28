import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageEntity } from './entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { ChannelModule } from 'src/channel/channel.module';

@Module({
  imports: [
    UserModule,
    ChannelModule,
    TypeOrmModule.forFeature([MessageEntity]),
  ],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
