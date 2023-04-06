import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
  async register({ email, nickname, password }: RegisterDto) {
    const passwordHash = await this.hashPassword(password);
    return await this.usersService.createUser(email, nickname, passwordHash);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    return await hash(password, salt);
  }

  async getUserFromAccessAuthToken(token: string, refreshToken: string) {
    try {
      const payload = verify(token, process.env.ACCESS_SECRET) as TokenPayload;
      if (payload?.email) {
        return this.usersService.findOne({
          id: parseInt(payload.id),
        });
      }
    } catch (error) {
      await this.getUserFromRefreshToken(refreshToken);
    }
  }

  async getUserFromRefreshToken(token: string) {
    const payload = await this.checkRefreshToken(token);
    if (payload?.email) {
      return this.usersService.findOne({
        id: payload.id,
      });
    }
  }

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOne(
      {
        email,
      },
      true,
    );
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const isCorrectPassword = await compare(pass, user.password);
    if (!isCorrectPassword) {
      throw new NotFoundException('Не правильный логин или пароль');
    }

    return user;
  }

  async login(
    user: Pick<UserEntity, 'email' | 'id' | 'nickname'>,
    values: { userAgent: string; ipAddress: string },
  ) {
    return this.newRefreshAndAccessToken(user, values);
  }

  private async newRefreshAndAccessToken(
    { email, id, nickname }: Pick<UserEntity, 'email' | 'id' | 'nickname'>,
    values: { userAgent: string; ipAddress: string },
  ) {
    const refreshToken = new RefreshToken({
      id,
      email,
      nickname,
      ...values,
    });

    return {
      refreshToken: refreshToken.sign(),
      accessToken: sign({ email, id, nickname }, process.env.ACCESS_SECRET, {
        expiresIn: '1h',
      }),
    };
  }

  async checkAccessToken(accessToken: string) {
    return verify(accessToken, process.env.ACCESS_SECRET);
  }

  async checkRefreshToken(refreshToken: string) {
    return verify(
      refreshToken,
      process.env.REFRESH_SECRET,
    ) as PayloadRefreshTokenDto;
  }
}
