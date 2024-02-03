import { UserDto } from '@api/user';

export interface AuthPayload {
  sub: number;
  tokenId: string;
  email: string;
}

export interface SignInResponse {
  user: UserDto;
  access_token: string;
}

export interface GeneratedToken {
  tokenId: string;
  token: string;
}
