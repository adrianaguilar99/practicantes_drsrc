import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { SeedingModule } from './seeding/seeding.module';
import { CommonModule } from './common/common.module';
import { ENV, JoiValidationSchema } from './configs';
import { AuthModule } from './auth/auth.module';
import { CareersModule } from './careers/careers.module';
import dbConfig from './configs/db.config';
import dbConfigProduction from './configs/db.config.production';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${ENV.NODE_ENV}`,
      expandVariables: true,
      load: [dbConfig, dbConfigProduction],
      validationSchema: JoiValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: ENV.NODE_ENV === 'production' ? dbConfigProduction : dbConfig,
    }),
    UsersModule,
    SeedingModule,
    CommonModule,
    AuthModule,
    CareersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
