import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { CreateUserDto, UserDto, UserService } from '@api/user';
import { SkipAuth } from '@common/guards/skip-auth.guard';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserExistsGuard } from './guards/user-exists.guard';
import { VerifyToken } from './guards/verify-token.guard';
import { SignInResponse } from './types';

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
  async signup(@Body() body: CreateUserDto): Promise<UserDto> {
    const user = await this.userService.createUser(body);
    await this.authService.sendVerificationEmail(user);
    return UserDto.fromEntity(user);
  }

  @SkipAuth()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Req() req: { user: UserDto }): Promise<SignInResponse> {
    return this.authService.signIn(req.user);
  }

  @Post('signout')
  async signout(@Req() req): Promise<void> {
    return this.authService.signOut(req.user.tokenId);
  }

  @SkipAuth()
  @Post('resend-verification-email')
  async resendVerificationEmail(@Req() req): Promise<void> {
    return this.authService.sendVerificationEmail(req.email);
  }

  @SkipAuth()
  @UseGuards(VerifyToken)
  @Get('verify-account')
  async verifyAccount(@Query('token') token): Promise<void> {
    return this.authService.verifyAccount(token);
  }
}
