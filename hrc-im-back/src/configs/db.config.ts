import { ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const getPgConfig = (
  configService: ConfigService,
): PostgresConnectionOptions => ({
  type: 'postgres',
  host: configService.getOrThrow<string>('DB_HOST'),
  port: configService.getOrThrow<number>('DB_PORT'),
  database: configService.getOrThrow<string>('DB_NAME'),
  username: configService.getOrThrow<string>('DB_USERNAME'),
  password: configService.getOrThrow<string>('DB_PASSWORD'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Ajusta según la ubicación de tus entidades
  // synchronize: process.env.TYPEORM_SYNC === 'true', // Asegúrate de controlar si quieres sincronizar el esquema en producción
  synchronize: true,
});
