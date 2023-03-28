import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
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
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.validateUser(dto.email, dto.password);
    const token = await this.authService.login(data.email, data.id);
    // res.setHeader(
    //   'Set-Cookie',
    //   `access_token=${token}; Path=/; Max-Age=${new Date(
    //     Date.now() + 1 * 24 * 240 * 1000,
    //   )}`,
    // );
    res.cookie('access_token', token, {
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 1 * 24 * 240 * 1000),
    });
    
    return data;
  }

  @Get('profile')
  async getProfile() {
    return 'hello';
  }
}
