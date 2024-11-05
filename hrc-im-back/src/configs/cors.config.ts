import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ALLOWED_ORIGINS, CORS_POLICY } from 'src/common/constants/constants';
import { ForbiddenException } from '@nestjs/common';

export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      console.log('Good Origin:', origin);
      callback(null, true);
    } else {
      console.log('Bad Origin:', origin);

      callback(new ForbiddenException(`${CORS_POLICY}`));
    }
  },
  methods: 'GET,PATCH,POST,DELETE',
  allowedHeaders:
    'Content-Type, Accept, Access-Control-Allow-Origin, Authorization',
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
