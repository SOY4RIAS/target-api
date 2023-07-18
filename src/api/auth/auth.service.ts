import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserDto, UserService } from '@api/user';
import { PlainUser } from '@api/user/types';

import { AuthEntity } from './auth.entity';
import { AuthPayload, SignInResponse } from './types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private authRepository: Repository<AuthEntity>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<PlainUser | null> {
    const user = await this.userService.findUserByEmail(email);
    return user?.hasValidPass(password) ? user.toPlainObject() : null;
  }

  async createPayload(user: UserDto): Promise<AuthPayload> {
    const authRecord = await this.authRepository.save({
      userId: user.id,
    });
    return {
      sub: user.id,
      tokenId: authRecord.tokenId,
      email: user.email,
    };
  }

  async validatePayload(payload: AuthPayload): Promise<boolean> {
    const authRecord = await this.authRepository.findOne({
      where: { tokenId: payload.tokenId, revoked: false },
    });
    return !!authRecord;
  }

  async signIn(user: UserDto): Promise<SignInResponse> {
    const payload = await this.createPayload(user);
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async signOut(tokenId: string): Promise<void> {
    await this.authRepository.update({ tokenId }, { revoked: true });
  }
}
