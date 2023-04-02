import { ChannelEntity } from 'src/channel/entities/channel.entity';
import { LocalFileEntity } from 'src/local-file/entities/local-file.entity';
import { MessageEntity } from 'src/message/entities/message.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nickname: string;
  @Column({ unique: true })
  email: string;
  @OneToOne(() => LocalFileEntity, { nullable: true })
  @JoinColumn({ name: 'avatarId' })
  avatar?: LocalFileEntity;
  @Column({ default: null })
  avatarId?: number;
  @Column({ default: 'offline' })
  status: string;
  @Column()
  password: string;
  @ManyToMany((type) => UserEntity, { nullable: true })
  @JoinTable()
  friends?: UserEntity[];
  @OneToMany(() => MessageEntity, (message) => message.owner)
  messages?: MessageEntity[];
  @ManyToMany(() => ChannelEntity, (channel) => channel.members, {
    nullable: true,
  })
  @JoinTable()
  channels?: ChannelEntity[];
}
