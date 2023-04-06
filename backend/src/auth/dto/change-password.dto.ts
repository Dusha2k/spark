import { IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsString({ message: 'Не должно быть пустым' })
  password: string;
  @IsString({ message: 'Не должно быть пустым' })
  oldPassword: string;
}
