import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { WebSocketServer, WsException } from '@nestjs/websockets';
import { parse } from 'cookie';
import { Server, Socket } from 'socket.io';
import { UserService } from 'src/user/user.service';
import { AuthService } from '../auth.service';

@Injectable()
export class WSJwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
    private readonly userService: UserService,
    private reflector: Reflector,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const client: Socket = context.switchToWs().getClient();
    const ipAddress = client.handshake.address;
    const userAgent = client.handshake.headers['user-agent'];
    const cookie = parse(client.handshake.headers['cookie']);
    try {
      if (cookie?.access_token && cookie?.access_token !== 'undefined') {
        const isValid = (await this.authService.checkAccessToken(
          cookie.access_token,
        )) as any;
        if (!isValid) {
          throw new WsException('Кривой access токена');
        }

        return this.activate(context);
      }

      if (!cookie?.refresh_token) {
        throw new WsException('Нет рефреш токена');
      }

      const payloadRefreshToken = await this.authService.checkRefreshToken(
        cookie.refresh_token,
      );
      if (!payloadRefreshToken) {
        throw new WsException('Не валидный рефреш токен');
      }

      const { refreshToken, accessToken } = await this.authService.login(
        payloadRefreshToken,
        {
          ipAddress,
          userAgent,
        },
      );
      client.emit('new_tokens', { refreshToken, accessToken });

      client.handshake.headers[
        'cookie'
      ] = `access_token=${accessToken}; refresh_token=${refreshToken}`;

      return this.activate(context);
    } catch (e) {
      return false;
    }
  }

  async activate(context: ExecutionContext): Promise<boolean> {
    return super.canActivate(context) as Promise<boolean>;
  }
}
