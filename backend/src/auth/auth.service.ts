import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import { genSalt, hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}
  async register({ email, login, password }: RegisterDto) {
    const salt = await genSalt(10);
    const passwordHash = await hash(password, salt);
    return await this.usersService.createUser(email, login, passwordHash);
  }

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const isCorrectPassword = await compare(pass, user.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException('Не правильный логин или пароль');
    }

    const { password, ...data } = user;
    return data;
  }

  async login(email: string) {
    const payload = email;
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
