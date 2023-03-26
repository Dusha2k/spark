import { IsInt, IsNumberString, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsInt()
  channelId: number;
  @IsInt()
  ownerId: number;
  @IsString()
  text: string;
}
