import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { Gateway } from './gateway.gateway';
import { ChannelModule } from 'src/channel/channel.module';
import { MessageModule } from 'src/message/message.module';

@Module({
  imports: [ChannelModule, MessageModule],
  providers: [Gateway, GatewayService],
})
export class GatewayModule {}
