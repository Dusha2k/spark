import {
  Controller,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser, GetCurrentUser } from 'src/decorators/user.decorator';
import { UserService } from './user.service';
import { SharpPipe, SharpPipeResponse } from 'src/local-file/sharp.pipe';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getCurrent(@GetCurrentUser() { id }: CurrentUser) {
    return await this.userService.findOne({
      id,
    });
  }

  @Get('/all')
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @Post('/avatar')
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(
    @GetCurrentUser() user: CurrentUser,
    @UploadedFile(
      new ParseFilePipe({
        // 3 * 1024 * 1024 это 3MB
        validators: [new MaxFileSizeValidator({ maxSize: 3 * 1024 * 1024 })],
      }),
      SharpPipe('/avatars'),
    )
    file: SharpPipeResponse,
  ) {
    return await this.userService.addAvatar(user.id, {
      path: file.path,
      filename: file.filename,
      mimetype: file.mimetype,
    });
  }
}
