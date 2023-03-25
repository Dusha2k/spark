import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser, GetCurrentUser } from 'src/decorators/user.decorator';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getCurrent(@GetCurrentUser() user: CurrentUser) {
    return await this.userService.findOne(user.email);
  }
}
