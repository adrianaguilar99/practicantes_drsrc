import * as Joi from 'joi';

// Configuracion necesaria del entorno
export const JoiValidationSchema = Joi.object({
  // --> ENVIRONMENT
  NODE_ENV: Joi.string().required(),
  PORT: Joi.number().required(),
  HOST_API: Joi.string().required(),
  INTERN_FILES_PATH: Joi.string().required(),
  // --> DATABASE
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_NAME: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  // JWT
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRE_IN: Joi.string().required(),
  REFRESH_JWT_SECRET: Joi.string().required(),
  REFRESH_JWT_EXPIRE_IN: Joi.string().required(),
  // GOOGLE
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_SECRET: Joi.string().required(),
  GOOGLE_CALLBACK_URL: Joi.string().required(),
  FRONT_URL_REDIRECT: Joi.string().optional(),
  // ADMIN CREDENTIALS
  ADMIN_FIRST_NAME: Joi.string().required(),
  ADMIN_LAST_NAME: Joi.string().required(),
  ADMIN_EMAIL: Joi.string().required(),
  ADMIN_PASSWORD: Joi.string().required(),
});
