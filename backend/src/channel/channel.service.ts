import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WsException } from '@nestjs/websockets';
import { parse } from 'cookie';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { ChannelEntity } from './entities/channel.entity';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(ChannelEntity)
    private readonly channelRepository: Repository<ChannelEntity>,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  async create({ members }: CreateChannelDto) {
    const users = await this.userService.findByIds(members);
    const channel = this.channelRepository.create({
      members: users,
    });

    return this.channelRepository.save(channel);
  }

  findById(id: string) {
    return this.channelRepository
      .createQueryBuilder('channel')
      .leftJoinAndSelect('channel.members', 'user')
      .where('channel.id = :id', { id })
      .getOne();
  }

  async getUserFromSocket(socket: Socket) {
    const cookie = socket.handshake.headers.cookie;
    if (!cookie) {
      return null;
    }
    const { access_token } = parse(cookie);
    const user = await this.authService.getUserFromAuthToken(access_token);
    if (!user) {
      throw new WsException('Кривые данные');
    }

    return user;
  }
}
