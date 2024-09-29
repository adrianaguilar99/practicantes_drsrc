import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ENV } from './env.config';
import { CORS_POLICY } from 'src/common/constants/constants';

const allowedOrigins = [
  ENV.FRONT_URL_REDIRECT,
  // Mas origenes?? ...
];

export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`${CORS_POLICY}`));
    }
  },
  methods: 'GET,PATCH,POST,DELETE',
  allowedHeaders:
    'Content-Type, Accept, Access-Control-Allow-Origin, Authorization',
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
