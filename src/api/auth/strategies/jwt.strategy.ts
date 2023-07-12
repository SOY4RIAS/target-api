import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from '@api/auth/auth.service';
import type { AuthPayload } from '@api/auth/types';
import { Environment } from '@shared/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService<Environment>,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
    });
  }

  async validate(payload: AuthPayload) {
    const isValid = await this.authService.validatePayload(payload);
    if (!isValid) {
      throw new UnauthorizedException();
    }
    return {
      userId: payload.sub,
      username: payload.email,
      tokenId: payload.tokenId,
    };
  }
}
