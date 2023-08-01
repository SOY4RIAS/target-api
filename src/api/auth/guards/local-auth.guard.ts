import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { LOCAL_GUARD_KEY } from '@api/auth/guards/constants';

@Injectable()
export class LocalAuthGuard extends AuthGuard(LOCAL_GUARD_KEY) {}
