import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from '@api/auth/auth.controller';
import { AuthEntity } from '@api/auth/auth.entity';
import { AuthService } from '@api/auth/auth.service';
import { JwtStrategy } from '@api/auth/strategies/jwt.strategy';
import { LocalStrategy } from '@api/auth/strategies/local.strategy';
import { UserModule } from '@api/user/user.module';
import { ENV } from '@common/constants';
import { SendgridService } from '@shared/sendgrid/sendgrid.service';
import { Environment } from '@shared/types';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService<Environment>) => ({
        secret: config.getOrThrow(ENV.JWT_SECRET),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([AuthEntity]),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, SendgridService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
