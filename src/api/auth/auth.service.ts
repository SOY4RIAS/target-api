import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserDto, UserService } from '@api/user';

import { AuthEntity } from './auth.entity';
import { AuthPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private authRepository: Repository<AuthEntity>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    if (user && user.hasValidPass(password)) {
      return user.toPlainObject();
    }
    return null;
  }

  async createPayload(user: UserDto) {
    const authRecord = await this.authRepository.save({
      userId: user.id,
    });
    return {
      sub: user.id,
      tokenId: authRecord.tokenId,
      email: user.email,
    };
  }

  async validatePayload(payload: AuthPayload) {
    const authRecord = await this.authRepository.findOne({
      where: { tokenId: payload.tokenId },
    });
    return authRecord && !authRecord.revoked;
  }

  async signIn(user: UserDto) {
    const payload = await this.createPayload(user);
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async signOut(tokenId: string) {
    await this.authRepository.update({ tokenId }, { revoked: true });
  }
}
