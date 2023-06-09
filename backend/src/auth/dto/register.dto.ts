import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Введите валидный email' })
  email: string;
  @IsString()
  nickname: string;
  @MinLength(6, { message: 'Минимальное кол-во символов 6' })
  @IsString({ message: 'Не должно быть пустым' })
  password: string;
}

export class ResponseRegisterDto {
  email: string;
  nickname: string;
  id: number;
}
