import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { CreateUserDto, UserDto } from '@/api/user/dto';
import { UserService } from '@/api/user/user.service';

import { UserExistsGuard } from './guards/user-exists.guard';

@Controller()
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(UserExistsGuard)
  @Post('signup')
  async signup(@Body() body: CreateUserDto) {
    const user = await this.userService.createUser(body);
    return UserDto.fromEntity(user);
  }
}
