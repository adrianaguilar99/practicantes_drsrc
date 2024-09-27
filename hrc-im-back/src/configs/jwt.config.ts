import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { ENV } from './env.config';

export default registerAs(
  'jwtConfig',
  (): JwtModuleOptions => ({
    secret: ENV.JWT.SECRET,
    signOptions: {
      expiresIn: ENV.JWT.EXPIRE_IN,
    },
  }),
);
