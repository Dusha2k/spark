import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UserEntity } from 'src/user/entities/user.entity';
import { Socket } from 'socket.io';
import { parse } from 'cookie';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWTFromCookie,
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_SECRET,
    });
  }

  private static extractJWTFromCookie(req: Request | Socket): string | null {
    if (req instanceof Socket) {
      const cookie = parse(req.handshake.headers['cookie']);
      if (cookie.access_token) {
        return cookie.access_token;
      }
      return null;
    }
    if (req.cookies) {
      if (req.cookies.access_token) {
        return req.cookies.access_token;
      }
    }
    return null;
  }

  async validate({ email, id }: Pick<UserEntity, 'email' | 'id'>) {
    return {
      email,
      id,
    };
  }
}
