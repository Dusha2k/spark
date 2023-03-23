import { ChannelEntity } from 'src/channel/entities/channel.entity';
import { MessageEntity } from 'src/message/entities/message.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  login: string;
  @Column()
  email: string;
  @Column()
  avatar: string;
  @Column()
  password: string;
  @OneToMany(() => MessageEntity, (message) => message.owner)
  messages: MessageEntity;
  @ManyToMany(() => ChannelEntity, (channel) => channel.members)
  channels: ChannelEntity;
}
