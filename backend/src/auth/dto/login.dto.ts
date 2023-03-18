import { IsEmail, IsString, Min } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Введите валидный email' })
  email: string;
  @Min(6, { message: 'Минимальное кол-во символов 6' })
  @IsString({ message: 'Не должно быть пустым' })
  password: string;
}
