import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { CreateUserDto, UserDto, UserService } from '@api/user';
import { SkipAuth } from '@common/guards/skip-auth.guard';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserExistsGuard } from './guards/user-exists.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @ApiOkResponse({
    type: UserDto,
  })
  @SkipAuth()
  @UseGuards(UserExistsGuard)
  @Post('signup')
  async signup(@Body() body: CreateUserDto) {
    const user = await this.userService.createUser(body);
    return UserDto.fromEntity(user);
  }

  @SkipAuth()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Req() req: { user: UserDto }) {
    return this.authService.signIn(req.user);
  }

  @Get('check-token')
  async checkToken(@Req() req) {
    return req.user;
  }

  @Post('signout')
  async signout(@Req() req) {
    return this.authService.signOut(req.user.tokenId);
  }
}
