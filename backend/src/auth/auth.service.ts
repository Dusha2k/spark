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
import { TokenPayload } from './interfaces/tokenPayload.interface';
import { UserEntity } from 'src/user/entities/user.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { sign, verify } from 'jsonwebtoken';
import { PayloadRefreshTokenDto } from './dto/payload-refresh-token.dto';

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

  async getUserFromAuthToken(token: string) {
    const payload: TokenPayload = this.jwtService.verify(token, {
      secret: process.env.ACCESS_SECRET,
    });
    if (payload?.email) {
      return this.usersService.findOne(payload.email);
    }
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

    return user;
  }

  async login(
    user: Pick<UserEntity, 'email' | 'id' | 'login'>,
    values: { userAgent: string; ipAddress: string },
  ) {
    return this.newRefreshAndAccessToken(user, values);
  }

  private async newRefreshAndAccessToken(
    { email, id, login }: Pick<UserEntity, 'email' | 'id' | 'login'>,
    values: { userAgent: string; ipAddress: string },
  ) {
    const refreshToken = new RefreshToken({
      id,
      email,
      login,
      ...values,
    });

    return {
      refreshToken: refreshToken.sign(),
      accessToken: sign({ email, id, login }, process.env.ACCESS_SECRET, {
        expiresIn: '1h',
      }),
    };
  }

  async checkRefreshToken(
    refreshToken: string,
  ): Promise<PayloadRefreshTokenDto | undefined> {
    return compare(refreshToken, process.env.REFRESH_SECRET);
  }
}
