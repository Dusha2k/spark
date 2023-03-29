import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { verify } from 'jsonwebtoken';
import { IS_PUBLIC_KEY } from 'src/decorators/skipAuth.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from '../auth.service';
import { PayloadRefreshTokenDto } from '../dto/payload-refresh-token.dto';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private reflector: Reflector,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const ipAddress = request.connection.remoteAddress;
    const userAgent = request.headers['user-agent'];

    try {
      const accessToken = request.cookies.access_token;
      if (accessToken) {
        return this.activate(context);
      }

      const refreshToken = request.cookies.refresh_token;
      if (!refreshToken) {
        throw new UnauthorizedException('Нет рефреш токена');
      }

      const payloadRefreshToken = verify(
        refreshToken,
        process.env.REFRESH_SECRET,
      ) as PayloadRefreshTokenDto | undefined;
      if (!payloadRefreshToken) {
        throw new UnauthorizedException('Не валидный рефреш токен');
      }

      const { refreshToken: newRefreshToken, accessToken: newAccessToken } =
        await this.authService.login(payloadRefreshToken, {
          ipAddress,
          userAgent,
        });

      request.cookies['access_token'] = newAccessToken;
      request.cookies['refresh_token'] = newRefreshToken;

      // 1 час
      response.cookie('access_token', newAccessToken, {
        httpOnly: false,
        secure: false,
        sameSite: 'lax',
        expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
      });

      // 7 дней
      response.cookie('refresh_token', newRefreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      return this.activate(context);
    } catch (err) {
      response.clearCookie('access_token');
      response.clearCookie('refresh_token');
      return this.activate(context);
    }
  }

  async activate(context: ExecutionContext): Promise<boolean> {
    return super.canActivate(context) as Promise<boolean>;
  }

  // handleRequest(err, user) {
  //   if (err || !user) {
  //     throw new UnauthorizedException();
  //   }

  //   return user;
  // }
}
