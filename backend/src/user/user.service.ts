import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  findOne(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  createUser(email: string, login: string, password: string) {
    return this.userRepository.save({
      email,
      login,
      password,
    });
  }
}
