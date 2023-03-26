import { MessageEntity } from 'src/message/entities/message.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('channels')
export class ChannelEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  name: string;
  @Column({ nullable: true })
  description: string;
  @Column({ nullable: true })
  avatar: string;
  @ManyToMany(() => UserEntity, (user) => user.channels)
  members: UserEntity[];
  @OneToMany(() => MessageEntity, (message) => message.channel, {
    cascade: true,
  })
  messages: MessageEntity[];
}
