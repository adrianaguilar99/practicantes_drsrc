import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENV, JoiValidationSchema } from './configs';
import { AuthModule } from './auth/auth.module';
import { CareersModule } from './careers/careers.module';
import { CommonModule } from './common/common.module';
import { DepartmentsModule } from './departments/departments.module';
import { InstitutionsModule } from './institutions/institutions.module';
import { PropertiesModule } from './properties/properties.module';
import { SeedingModule } from './seeding/seeding.module';
import { SupervisorsModule } from './supervisors/supervisors.module';
import { SystemAuditsModule } from './system-audits/system-audits.module';
import { UsersModule } from './users/users.module';
import { InternsModule } from './interns/interns.module';
import { EmergencyContactModule } from './emergency-contact/emergency-contact.module';
import { InternFilesModule } from './intern-files/intern-files.module';
import { InternCommentsModule } from './intern-comments/intern-comments.module';
import { InternScheduleModule } from './intern-schedule/intern-schedule.module';
import { AttendancesModule } from './attendances/attendances.module';
import dbConfig from './configs/db.config';
import dbConfigProduction from './configs/db.config.production';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${ENV.NODE_ENV}`,
      load: [dbConfig, dbConfigProduction],
      validationSchema: JoiValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: ENV.NODE_ENV === 'production' ? dbConfigProduction : dbConfig,
    }),
    AuthModule,
    CareersModule,
    CommonModule,
    DepartmentsModule,
    InstitutionsModule,
    PropertiesModule,
    SeedingModule,
    SupervisorsModule,
    SystemAuditsModule,
    UsersModule,
    InternsModule,
    EmergencyContactModule,
    InternFilesModule,
    InternCommentsModule,
    InternScheduleModule,
    AttendancesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
