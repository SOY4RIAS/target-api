export enum TOKEN_TYPE {
  SESSION = 'SESSION',
  VERIFY_ACCOUNT = 'VERIFY_ACCOUNT',
}

export const SESSION_DAYS = 7;
export const DAY_MILLISECONDS = 86_400_000;

export const VERIFY_ACCOUNT_PATH = '/api/v1/auth/verify-account';
