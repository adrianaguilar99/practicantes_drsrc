import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  PORT: Joi.number().required().default(3005),
  DB_HOST: Joi.string().required().default('localhost'),
  DB_PORT: Joi.number().required().default(5432),
  DB_NAME: Joi.string().required().default('postgres'),
  DB_USERNAME: Joi.string().required().default('postgres'),
  DB_PASSWORD: Joi.string().required(),
});
