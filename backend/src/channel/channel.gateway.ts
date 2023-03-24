import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { parse } from 'cookie';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { ChannelService } from './channel.service';

@WebSocketGateway({ cors: '*:*' })
export class ChannelGateway implements OnGatewayConnection {
  constructor(private readonly channelService: ChannelService) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(socket: Socket) {
    return await this.channelService.getUserFromSocket(socket);
  }

  @SubscribeMessage('send_message')
  listenForMessages(@MessageBody() data: string) {
    console.log('here');
    //this.server.sockets.emit('receive_message', data);
  }
}
