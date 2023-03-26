import { IsString } from 'class-validator';

export class CreateChannelDto {
  @IsString({ each: true })
  members: string[];
}
