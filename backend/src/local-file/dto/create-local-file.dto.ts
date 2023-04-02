import { IsString } from 'class-validator';

export class CreateLocalFileDto {
  @IsString()
  filename: string;
  @IsString()
  path: string;
  @IsString()
  mimetype: string;
}
