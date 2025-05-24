import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const corsConfig: CorsOptions = {
  origin: '*',
  methods: 'GET,PATCH,POST,DELETE',
  allowedHeaders:
    'Content-Type, Accept, Access-Control-Allow-Origin, Authorization',
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
