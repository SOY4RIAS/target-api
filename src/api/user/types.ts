import { User } from '@api/user/user.entity';

export type PlainUser = Omit<User, 'password'>;
