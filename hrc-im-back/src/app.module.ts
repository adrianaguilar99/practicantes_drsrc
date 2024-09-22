import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { SeedingModule } from './seeding/seeding.module';
import { CommonModule } from './common/common.module';
import { JoiValidationSchema } from './configs';
import { AuthModule } from './auth/auth.module';
import dbConfig from './configs/db.config';
import dbConfigProduction from './configs/db.config.production';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development.local',
      expandVariables: true,
      load: [dbConfig, dbConfigProduction],
      validationSchema: JoiValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      useFactory:
        process.env.NODE_ENV === 'production' ? dbConfigProduction : dbConfig,
    }),
    UserModule,
    SeedingModule,
    CommonModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
