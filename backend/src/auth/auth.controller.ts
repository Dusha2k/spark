import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ConflictException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const existedUser = await this.authService.findOne(dto.email);
    if (existedUser) {
      throw new ConflictException('Такой пользователь уже существует');
    }

    const { passwordHash, ...data } = await this.authService.register(dto);
    return data;
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
