import { Injectable } from '@nestjs/common';

import { UserService } from '@api/user';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    if (user && user.hasValidPass(password)) {
      return user.toPlainObject();
    }
    return null;
  }
}
