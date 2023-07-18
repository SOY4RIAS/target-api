import {
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';

import { UserDto, UserService } from '@api/user';
import { PlainUser } from '@api/user/types';
import { ENV } from '@common/constants';
import { SendgridService } from '@shared/sendgrid/sendgrid.service';
import { Environment } from '@shared/types';

import { AuthEntity } from './auth.entity';
import { TOKEN_TYPE, VERIFY_ACCOUNT_PATH } from './constants';
import { AuthPayload, GeneratedToken, SignInResponse } from './types';
import { getTokenExpiration } from './utils';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private authRepository: Repository<AuthEntity>,
    private userService: UserService,
    private jwtService: JwtService,
    private sendgridService: SendgridService,
    private configService: ConfigService<Environment>,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<PlainUser | null> {
    const user = await this.userService.findUserByEmail(email);
    return user?.hasValidPass(password) ? user.toPlainObject() : null;
  }

  async validatePayload(payload: AuthPayload): Promise<boolean> {
    const authRecord = await this.authRepository.findOne({
      where: { tokenId: payload.tokenId, revoked: false },
    });
    return !!authRecord;
  }

  async signIn(user: UserDto): Promise<SignInResponse> {
    const { token } = await this.createToken(user);
    return { user, access_token: token };
  }

  async signOut(tokenId: string): Promise<void> {
    await this.revokeToken(tokenId);
  }

  async createToken(
    user: UserDto,
    tokenType: TOKEN_TYPE = TOKEN_TYPE.SESSION,
  ): Promise<GeneratedToken> {
    const revokeExistingTokens = this.authRepository.update(
      { userId: user.id, tokenType, revoked: false },
      { revoked: true },
    );

    const expiresAt = getTokenExpiration(tokenType);
    const saveNewToken = this.authRepository.save({
      userId: user.id,
      tokenType,
      expiresAt,
    });

    const [, authRecord] = await Promise.all([
      revokeExistingTokens,
      saveNewToken,
    ]);

    const payload: AuthPayload = {
      tokenId: authRecord.tokenId,
      sub: user.id,
      email: user.email,
    };

    return {
      tokenId: authRecord.tokenId,
      token: this.jwtService.sign(payload, {
        expiresIn: expiresAt.getTime(),
      }),
    };
  }

  async revokeToken(tokenId: string): Promise<void> {
    await this.authRepository.update({ tokenId }, { revoked: true });
  }

  async sendVerificationEmail(user: UserDto): Promise<void> {
    const { token } = await this.createToken(user, TOKEN_TYPE.VERIFY_ACCOUNT);
    this.sendgridService.send({
      to: user.email,
      from: this.configService.getOrThrow(ENV.SENDGRID_SENDER),
      dynamicTemplateData: {
        url: `${this.configService.getOrThrow(
          ENV.BASE_URL,
        )}${VERIFY_ACCOUNT_PATH}?token=${token}`,
        name: user.name,
      },
      templateId: this.configService.getOrThrow(
        ENV.SENDGRID_VERIFICATION_TEMPLATE_ID,
      ),
    });
  }

  checkToken(token: string): Promise<AuthEntity | null> {
    return this.authRepository.findOne({
      where: {
        tokenId: token,
        revoked: false,
        expiresAt: MoreThanOrEqual(new Date()),
      },
    });
  }

  async verifyAccount(token: string): Promise<void> {
    const payload = this.jwtService.decode(token) as AuthPayload;
    const revokingToken = this.revokeToken(payload.tokenId);
    const verifyingUser = this.userService.verifyUser(payload.sub);
    const [, userVerified] = await Promise.all([revokingToken, verifyingUser]);
    if (!userVerified) {
      throw new InternalServerErrorException('User not verified');
    }
  }
}
