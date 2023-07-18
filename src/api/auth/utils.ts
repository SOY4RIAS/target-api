import { DAY_MILLISECONDS, SESSION_DAYS, TOKEN_TYPE } from './constants';

export const getTokenExpiration = (tokenType: TOKEN_TYPE): Date => {
  const TOKEN_EXPIRATION = {
    [TOKEN_TYPE.SESSION]: () =>
      new Date(Date.now() + SESSION_DAYS * DAY_MILLISECONDS),
    [TOKEN_TYPE.VERIFY_ACCOUNT]: () => new Date(Date.now() + DAY_MILLISECONDS),
  };

  return TOKEN_EXPIRATION[tokenType]();
};
