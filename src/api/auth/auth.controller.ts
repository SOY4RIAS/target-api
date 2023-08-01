import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { AuthService } from '@api/auth/auth.service';
import { LocalAuthGuard } from '@api/auth/guards/local-auth.guard';
import { UserExistsGuard } from '@api/auth/guards/user-exists.guard';
import { VerifyToken } from '@api/auth/guards/verify-token.guard';
import { SignInResponse } from '@api/auth/types';
import { CreateUserDto, UserDto, UserService } from '@api/user';
import { SkipAuth } from '@common/guards/skip-auth.guard';

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
