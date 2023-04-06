import { IsString, IsNumber } from 'class-validator';

export class CreateChannelDto {
  @IsNumber({}, { each: true })
  members: number[];
}
