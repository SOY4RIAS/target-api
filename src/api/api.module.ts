import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthModule } from '@api/auth/auth.module';
import { JwtAuthGuard } from '@api/auth/guards/jwt-auth.guard';
import { UserModule } from '@api/user/user.module';

@Module({
  imports: [UserModule, AuthModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class ApiModule {}
