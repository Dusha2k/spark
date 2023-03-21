import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags, OmitType } from '@nestjs/swagger';
import { SkipAuth } from 'src/decorators/skipAuth.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDto, LoginUserResponseDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UserService,
    private authService: AuthService,
  ) {}

  @SkipAuth()
  @Post('register')
  @ApiCreatedResponse({ type: OmitType(UserEntity, ['password']) })
  async register(@Body() dto: RegisterDto) {
    const existedUser = await this.usersService.findOne(dto.email);
    if (existedUser) {
      throw new ConflictException('Такой пользователь уже существует');
    }

    const { password, ...data } = await this.authService.register(dto);
    return data;
  }

  @SkipAuth()
  @HttpCode(200)
  @Post('login')
  @ApiCreatedResponse({ type: LoginUserResponseDto })
  async login(@Body() dto: LoginDto) {
    const { email } = await this.authService.validateUser(
      dto.email,
      dto.password,
    );
    return this.authService.login(email);
  }

  @Get('profile')
  async getProfile() {
    return 'hello';
  }
}
