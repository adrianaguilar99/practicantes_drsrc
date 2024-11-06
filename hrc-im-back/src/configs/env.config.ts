import * as dotenv from 'dotenv';

const envFileName = `.env.${process.env.NODE_ENV}`;

function loadEnv(envFileName: string) {
  const result = dotenv.config({ path: envFileName });

  if (result.error) throw new Error(`Error: ${result.error}`);

  return process.env;
}
const loadedEnv = loadEnv(envFileName);

export const ENV = {
  NODE_ENV: loadedEnv.NODE_ENV,
  PORT: +process.env.PORT,
  HOST_API: process.env.HOST_API,
  INTERN_FILES_PATH: process.env.INTERN_FILES_PATH,
  DB: {
    HOST: process.env.DB_HOST,
    PORT: +process.env.DB_PORT,
    NAME: process.env.DB_NAME,
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
  },
  JWT: {
    SECRET: process.env.JWT_SECRET,
    EXPIRE_IN: process.env.JWT_EXPIRE_IN,
  },
  REFRESH_JWT: {
    SECRET: process.env.REFRESH_JWT_SECRET,
    EXPIRE_IN: process.env.REFRESH_JWT_EXPIRE_IN,
  },
  GOOGLE_OAUTH: {
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    SECRET: process.env.GOOGLE_SECRET,
    CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
  },
  FRONT_URL_REDIRECT: process.env.FRONT_URL_REDIRECT,
  ADMIN: {
    FIRST_NAME: process.env.ADMIN_FIRST_NAME,
    LAST_NAME: process.env.ADMIN_LAST_NAME,
    EMAIL: process.env.ADMIN_EMAIL,
    PASSWORD: process.env.ADMIN_PASSWORD,
  },
};
