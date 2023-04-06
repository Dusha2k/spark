import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Ip,
  NotFoundException,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { SkipAuth } from 'src/decorators/skipAuth.decorator';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto, ResponseRegisterDto } from './dto/register.dto';
import { CurrentUser, GetCurrentUser } from 'src/decorators/user.decorator';
import { ChangePasswordDto } from './dto/change-password.dto';

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
    const existedUser = await this.usersService.findOne({
      email: dto.email,
    });
    if (existedUser) {
      throw new ConflictException('Такой пользователь уже существует');
    }

    return await this.authService.register(dto);
  }

  @Post('change-password')
  @HttpCode(200)
  async changePassword(
    @Body() { oldPassword, password }: ChangePasswordDto,
    @GetCurrentUser() { email }: CurrentUser,
  ) {
    const user = await this.authService.validateUser(email, oldPassword);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    const hashPassword = await this.authService.hashPassword(password);
    user.password = hashPassword;
    this.usersService.updateUser(user);
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

  @SkipAuth()
  @Get('check')
  async checkRefreshToken(@Res() response: Response, @Req() request: Request) {
    const refreshToken = request.cookies.refresh_token;
    if (!refreshToken) {
      return response.status(HttpStatus.UNAUTHORIZED).send();
    }
    const user = this.authService.checkRefreshToken(refreshToken);
    if (user) {
      response.status(HttpStatus.OK).send();
    } else {
      response.status(HttpStatus.UNAUTHORIZED).send();
    }
  }
}
