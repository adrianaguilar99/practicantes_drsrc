import { registerAs } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ENV } from './env.config';

export default registerAs(
  'dbConfig.production.env',
  (): PostgresConnectionOptions => ({
    type: 'postgres',
    host: ENV.DB.HOST,
    port: ENV.DB.PORT,
    database: ENV.DB.NAME,
    username: ENV.DB.USERNAME,
    password: ENV.DB.PASSWORD,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
  }),
);
