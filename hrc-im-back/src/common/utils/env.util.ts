import { ConfigService } from '@nestjs/config';

export class EnvironmentVariables {
  NODE_ENV: string;
  PORT: number;
  DB_HOST: string;
  DB_PORT: string;
  DB_NAME: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  JWT_SECRET: string;
  JWT_EXPIRE_IN: string;
  REFRESH_JWT_SECRET: string;
  REFRESH_JWT_EXPIRE_IN: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_SECRET: string;
  GOOGLE_CALLBACK_URL: string;
}

let ENV: EnvironmentVariables;

export const loadEnvVariables = (configService: ConfigService) => {
  ENV = {
    NODE_ENV: configService.get<string>('NODE_ENV'),
    PORT: configService.get<number>('PORT', 5000),
    DB_HOST: configService.get<string>('DB_HOST', 'localhost'),
    DB_PORT: configService.get<string>('DB_PORT', '5432'),
    DB_NAME: configService.get<string>('DB_NAME'),
    DB_USERNAME: configService.get<string>('DB_USERNAME'),
    DB_PASSWORD: configService.get<string>('DB_PASSWORD'),
    JWT_SECRET: configService.get<string>('JWT_SECRET'),
    JWT_EXPIRE_IN: configService.get<string>('JWT_EXPIRE_IN'),
    REFRESH_JWT_SECRET: configService.get<string>('REFRESH_JWT_SECRET'),
    REFRESH_JWT_EXPIRE_IN: configService.get<string>('REFRESH_JWT_EXPIRE_IN'),
    GOOGLE_CLIENT_ID: configService.get<string>('GOOGLE_CLIENT_ID'),
    GOOGLE_SECRET: configService.get<string>('GOOGLE_SECRET'),
    GOOGLE_CALLBACK_URL: configService.get<string>('GOOGLE_CALLBACK_URL'),
  };
};

export const getEnv = (): EnvironmentVariables => {
  if (!ENV) {
    throw new Error(
      'Environment variables have not been loaded. Call loadEnvVariables() first.',
    );
  }
  return ENV;
};
