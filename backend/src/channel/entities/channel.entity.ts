import { MessageEntity } from 'src/message/entities/message.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('channels')
export class ChannelEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  avatar: string;
  @ManyToMany(() => UserEntity, (user) => user.channels)
  @JoinTable()
  members: UserEntity;
  @OneToMany(() => MessageEntity, (message) => message.channel)
  messages: MessageEntity;
}
