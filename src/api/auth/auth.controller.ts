import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { CreateUserDto, UserDto, UserService } from '@api/user';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
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
  @UseGuards(UserExistsGuard)
  @Post('signup')
  async signup(@Body() body: CreateUserDto) {
    const user = await this.userService.createUser(body);
    return UserDto.fromEntity(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Req() req: { user: UserDto }) {
    return this.authService.signIn(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('check-token')
  async checkToken(@Req() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('signout')
  async signout(@Req() req) {
    return this.authService.signOut(req.user.tokenId);
  }
}
