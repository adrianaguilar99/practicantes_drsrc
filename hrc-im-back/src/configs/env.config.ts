import * as dotenv from 'dotenv';

function loadEnv() {
  // Si estamos en Railway o producción, usa las variables de entorno directamente
  if (
    process.env.RAILWAY_ENVIRONMENT ||
    process.env.NODE_ENV === 'production'
  ) {
    return process.env;
  }

  // Para desarrollo local, intenta cargar el archivo .env
  const envFileName = `.env.${process.env.NODE_ENV}`;
  const result = dotenv.config({ path: envFileName });

  // Si hay error al cargar el archivo, intenta cargar .env por defecto
  if (result.error) {
    const defaultResult = dotenv.config();
    if (defaultResult.error) {
      console.warn(
        `No se pudo cargar el archivo de variables de entorno ${envFileName}`,
      );
    }
  }

  return process.env;
}

const loadedEnv = loadEnv();

export const ENV = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: +(process.env.PORT || 3000), // Valor por defecto para PORT
  HOST_API: process.env.HOST_API,
  INTERN_FILES_PATH: process.env.INTERN_FILES_PATH,
  DB: {
    HOST: process.env.DB_HOST,
    PORT: +(process.env.DB_PORT || 5432), // Valor por defecto para DB_PORT
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
