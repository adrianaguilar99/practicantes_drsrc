import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
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
import { UserNotificationsModule } from './user-notifications/user-notifications.module';
import { InternReportsModule } from './intern-reports/intern-reports.module';
import { PdfPrinterModule } from './pdf-printer/pdf-printer.module';
import dbConfig from './configs/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      // Esto hará que si NODE_ENV=development, lea .env.development;
      // si NODE_ENV=production, lea .env.production, etc.
      // Y si no lo encuentra, al menos leerá el .env "normal".
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],

      // Cargamos la configuración de DB (registerAs('dbConfig', ...))
      load: [dbConfig],

      // Hace disponible el ConfigService de forma global
      isGlobal: true,
    }),

    // Configuramos TypeORM usando la config que acabamos de registrar
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get('dbConfig');
        // 'dbConfig' coincide con registerAs('dbConfig')
      },
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
    UserNotificationsModule,
    InternReportsModule,
    PdfPrinterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
