import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Введите валидный email' })
  email: string;
  @MinLength(6, { message: 'Минимальное кол-во символов 6' })
  @IsString({ message: 'Не должно быть пустым' })
  password: string;
}

export class LoginUserResponseDto {
  email: string;
  login: string;
}
