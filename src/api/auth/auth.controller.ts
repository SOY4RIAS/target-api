import { ApiOkResponse } from '@nestjs/swagger';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { UserService } from '@user/user.service';
import { CreateUserDto, UserDto } from '@user/dto';

import { UserExistsGuard } from './guards/user-exists.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    type: UserDto,
  })
  @UseGuards(UserExistsGuard)
  @Post('signup')
  async signup(@Body() body: CreateUserDto) {
    const user = await this.userService.createUser(body);
    return UserDto.fromEntity(user);
  }
}
