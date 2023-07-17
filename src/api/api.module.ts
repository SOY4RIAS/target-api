import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { TopicsModule } from './topics/topics.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, AuthModule, TopicsModule],
})
export class ApiModule {}
