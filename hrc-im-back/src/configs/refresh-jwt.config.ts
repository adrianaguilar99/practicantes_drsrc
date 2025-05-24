import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';
import { ENV } from './env.config';

export default registerAs(
  'refreshJwtConfig',
  (): JwtSignOptions => ({
    secret: ENV.REFRESH_JWT.SECRET,
    expiresIn: ENV.REFRESH_JWT.EXPIRE_IN,
  }),
);
