import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { Gateway } from './gateway.gateway';
import { ChannelModule } from 'src/channel/channel.module';
import { MessageModule } from 'src/message/message.module';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [ChannelModule, MessageModule, UserModule, AuthModule],
  providers: [Gateway, GatewayService],
})
export class GatewayModule {}
