import { ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const getPgConfig = (
  configService: ConfigService,
): PostgresConnectionOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  database: configService.get<string>('DB_DATABASE'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Ajusta según la ubicación de tus entidades
  // synchronize: process.env.TYPEORM_SYNC === 'true', // Asegúrate de controlar si quieres sincronizar el esquema en producción
  synchronize: true,
});
