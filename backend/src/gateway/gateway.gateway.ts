import {
  ConnectedSocket,
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
import { CreateMessageDto } from 'src/message/dto/create-message.dto';
import { MessageService } from 'src/message/message.service';
import { ChannelService } from '../channel/channel.service';

@WebSocketGateway()
export class Gateway implements OnGatewayConnection {
  constructor(
    private readonly channelService: ChannelService,
    private readonly messageService: MessageService,
  ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(socket: Socket) {
    const user = await this.channelService.getUserFromSocket(socket);
    // Войти в свою личную комнату для оповещения от кого-то по id пользователя
    // Юзкейс: человек создал с кем-то комнату зная его id нужно его оповестить об этом
    socket.join(`user:${user.id}`);
    // Оповещение всех каналов о том что пользователь зашел в сеть
    user.channels.forEach((channel) => {
      socket.join(`channel:${channel.id}`);
      socket
        .to(`channel:${channel.id}`)
        .emit('user_connected', { id: user.id });
    });
    // TODO: Добавить друзей и оповестить их всех о том что пользователь зашел
    return user;
  }

  @SubscribeMessage('send_message')
  listenForMessages(
    @MessageBody() data: CreateMessageDto,
    @ConnectedSocket() socket: Socket,
  ) {
    this.server.to(`channel:${data.channelId}`).emit('receive_message', data);
  }
}
