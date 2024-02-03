import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from '@api/auth/auth.service';
import { AuthPayload } from '@api/auth/types';

@Injectable()
export class VerifyToken implements CanActivate {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const { token } = context.switchToHttp().getRequest().query;
    const verifiedToken = await this.jwtService
      .verifyAsync<AuthPayload>(token)
      .catch(() => null);

    if (!verifiedToken) {
      throw new BadRequestException('Invalid token');
    }

    const authRecord = await this.authService.checkToken(verifiedToken.tokenId);

    if (!authRecord) {
      await this.authService.revokeToken(token);
      throw new BadRequestException('Invalid token');
    }

    return true;
  }
}
