import { ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const getDatabaseConfig = (
  configService: ConfigService,
): PostgresConnectionOptions => {
  // Aqui puedo imprimir las variables de entorno de esta configuracion
  const environment = configService.get<string>('NODE_ENV');

  // console.log(`Environment: ${environment}`);

  const synchronize = environment === 'production' ? false : true;

  // console.log(`Synchronize value: ${synchronize}`);

  return {
    type: 'postgres',
    host: configService.getOrThrow<string>('DB_HOST'),
    port: configService.getOrThrow<number>('DB_PORT'),
    database: configService.getOrThrow<string>('DB_NAME'),
    username: configService.getOrThrow<string>('DB_USERNAME'),
    password: configService.getOrThrow<string>('DB_PASSWORD'),
    synchronize,
  };
};
