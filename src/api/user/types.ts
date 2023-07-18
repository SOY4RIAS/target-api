import { User } from './user.entity';

export type PlainUser = Omit<User, 'password'>;
