import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, In, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserStatus } from './types/user-status.type';
import { CreateLocalFileDto } from 'src/local-file/dto/create-local-file.dto';
import { LocalFileService } from 'src/local-file/local-file.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly localFileService: LocalFileService,
  ) {}
  findOne(
    searchTerm: { email?: string; id?: number },
    withRelations = true,
    withPassword = false,
  ) {
    return this.userRepository.findOne({
      where:
        searchTerm?.id !== undefined
          ? {
              id: searchTerm.id,
            }
          : { email: searchTerm.email },
      relations: withRelations
        ? [
            'channels',
            'friends',
            'channels.members',
            'channels.messages',
            'channels.messages.owner',
          ]
        : [],
      select: {
        id: true,
        nickname: true,
        email: true,
        avatarId: true,
        status: true,
        password: withPassword,
      },
    });
  }

  findByIds(usersIds: number[]) {
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

  createUser(email: string, nickname: string, password: string) {
    return this.userRepository.save({
      email,
      nickname,
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

  async addAvatar(userId: number, fileData: CreateLocalFileDto) {
    const avatar = await this.localFileService.create(fileData);
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    user.avatarId = avatar.id;
    return this.userRepository.save(user);
  }

  async changeUserNickname(userId: number, nickname: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    user.nickname = nickname;
    return this.userRepository.save(user);
  }
}
