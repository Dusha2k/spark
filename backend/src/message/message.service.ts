import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelService } from 'src/channel/channel.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageEntity } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    private readonly userService: UserService,
    private readonly channelService: ChannelService,
  ) {}
  async create({ channelId, ownerId, text }: CreateMessageDto) {
    const channel = await this.channelService.findById(channelId.toString());

    // TODO: отрефакторить что бы был поиск просто по одному id
    const owner = await this.userService.findByIds([ownerId.toString()]);
    return this.messageRepository.save({
      text,
      channel,
      owner: owner[0],
    });
  }

  findByChannelId(channelId: number) {
    return this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.owner', 'owner')
      .leftJoinAndSelect('message.channel', 'channel')
      .where('message.channel.id = :id', { id: channelId })
      .getMany();
  }

  findAll() {
    return `This action returns all message`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
