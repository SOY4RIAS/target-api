import {
  CanActivate,
  ConflictException,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';

import { UserService } from '@/api/user/user.service';

@Injectable()
export class UserExistsGuard implements CanActivate {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const { email } = context.switchToHttp().getRequest().body;
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      return true;
    }

    throw new ConflictException('User already exists');
  }
}
