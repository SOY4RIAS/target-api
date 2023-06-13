export interface Environment {
  PORT: number;
  BASE_URL: string;
  DATABASE_HOST: string;
  DATABASE_NAME: string;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_PORT: number;
  JWT_SECRET: string;
  SALT_ROUNDS: number;
}
