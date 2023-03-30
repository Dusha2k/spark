import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
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
import { UserService } from 'src/user/user.service';
import { ChannelService } from '../channel/channel.service';

@WebSocketGateway()
export class Gateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly channelService: ChannelService,
    private readonly messageService: MessageService,
    private readonly userService: UserService,
  ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(socket: Socket) {
    const user = await this.channelService.getUserFromSocket(socket);
    // Войти в свою личную комнату для оповещения от кого-то по id пользователя
    // Юзкейс: человек создал с кем-то комнату зная его id нужно его оповестить об этом
    socket.join(`user:${user.id}`);
    // Обновить статус пользователя
    await this.userService.changeUserStatus(user.id, 'online');
    // Оповещение всех каналов о том что пользователь зашел в сеть
    user.channels.forEach((channel) => {
      socket.join(`channel:${channel.id}`);
      socket
        .to(`channel:${channel.id}`)
        .emit('user_connected', { id: user.id, channelId: channel.id });
    });
    // TODO: Добавить друзей и оповестить их всех о том что пользователь зашел
    return user;
  }

  async handleDisconnect(socket: Socket) {
    const user = await this.channelService.getUserFromSocket(socket);
    socket.leave(`user:${user.id}`);
    // Обновить статус пользователя
    await this.userService.changeUserStatus(user.id, 'offline');
    // Оповещение всех каналов о том что пользователь вышел из сети
    user.channels.forEach((channel) => {
      socket.leave(`channel:${channel.id}`);
      socket
        .to(`channel:${channel.id}`)
        .emit('user_disconnected', { id: user.id, channelId: channel.id });
    });
    socket.disconnect();
  }

  @SubscribeMessage('send_message')
  async listenForMessages(
    @MessageBody() data: CreateMessageDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const newMessage = await this.messageService.create(data);
    this.server
      .to(`channel:${data.channelId}`)
      .emit('receive_message', newMessage);
  }
}
