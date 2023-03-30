import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserStatus } from './types/user-status.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  findOne(email: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.channels', 'channel')
      .leftJoinAndSelect('channel.messages', 'messages')
      .leftJoinAndSelect('channel.members', 'member')
      .leftJoinAndSelect('messages.owner', 'owner')
      .where('user.email = :email', { email })
      .getOne();
  }

  findByIds(usersIds: string[]) {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.channels', 'channel')
      .where('user.id IN (:...usersIds)', { usersIds })
      .getMany();
  }

  findAll() {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.channels', 'channel')
      .getMany();
  }

  updateUser(user: UserEntity) {
    return this.userRepository.save(user);
  }

  createUser(email: string, login: string, password: string) {
    return this.userRepository.save({
      email,
      login,
      password,
    });
  }

  changeUserStatus(userId: number, status: UserStatus) {
    return this.userRepository
      .createQueryBuilder()
      .update(UserEntity)
      .set({ status })
      .where('id =  :id', { id: userId })
      .execute();
  }
}
