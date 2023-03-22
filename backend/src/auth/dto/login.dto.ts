import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Введите валидный email' })
  email: string;
  @MinLength(6, { message: 'Минимальное кол-во символов 6' })
  @IsString({ message: 'Не должно быть пустым' })
  password: string;
}

export class ResponseLoginDto {
  token: string;
  id: number;
  login: string;
  email: string;
}
