// db.config.ts
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs('dbConfig', (): TypeOrmModuleOptions => {
  const isProduction = process.env.NODE_ENV === 'production';
  const databaseUrl = process.env.DATABASE_URL;

  if (databaseUrl) {
    // CASO: Estás en Railway (o en cualquier hosting con DATABASE_URL)
    return {
      type: 'postgres',
      url: databaseUrl,
      // En producción (Railway) normalmente se requiere SSL
      ssl: isProduction ? { rejectUnauthorized: false } : false,
      autoLoadEntities: true,
      // En producción, mejor usar migraciones en vez de synchronize
      synchronize: !isProduction,
    };
  }

  // CASO: No tienes DATABASE_URL => estás en local
  return {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: +process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'my_local_db',
    autoLoadEntities: true,
    synchronize: true, // Solo en desarrollo
  };
});
