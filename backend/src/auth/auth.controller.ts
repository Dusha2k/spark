import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Ip,
  Post,
  Req,
  Request,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
  OmitType,
} from '@nestjs/swagger';
import { SkipAuth } from 'src/decorators/skipAuth.decorator';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDto, ResponseLoginDto } from './dto/login.dto';
import { RegisterDto, ResponseRegisterDto } from './dto/register.dto';
import { GetCurrentUser, CurrentUser } from 'src/decorators/user.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UserService,
    private authService: AuthService,
  ) {}

  @SkipAuth()
  @Post('register')
  @ApiCreatedResponse({ type: ResponseRegisterDto })
  async register(@Body() dto: RegisterDto) {
    const existedUser = await this.usersService.findOne(dto.email);
    if (existedUser) {
      throw new ConflictException('Такой пользователь уже существует');
    }

    const { password, ...data } = await this.authService.register(dto);
    return data;
  }

  @SkipAuth()
  @Post('login')
  @HttpCode(200)
  async login(
    @Req() request,
    @Ip() ip: string,
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    const { accessToken, refreshToken } = await this.authService.login(user, {
      ipAddress: ip,
      userAgent: request.headers['user-agent'],
    });

    // 1 час
    res.cookie('access_token', accessToken, {
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
    });

    // 7 дней
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return user;
  }

  @Get('profile')
  async getProfile() {
    return 'hello';
  }
}
