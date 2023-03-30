import { ChannelEntity } from 'src/channel/entities/channel.entity';
import { MessageEntity } from 'src/message/entities/message.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  login: string;
  @Column()
  email: string;
  @Column({ default: null })
  avatar: string;
  @Column({ default: 'offline' })
  status: string;
  @Column()
  password: string;
  @ManyToMany((type) => UserEntity)
  @JoinTable()
  friends: UserEntity[];
  @OneToMany(() => MessageEntity, (message) => message.owner)
  messages: MessageEntity[];
  @ManyToMany(() => ChannelEntity, (channel) => channel.members)
  @JoinTable()
  channels: ChannelEntity[];
}
