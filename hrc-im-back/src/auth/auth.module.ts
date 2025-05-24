import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy, LocalStrategy, RefreshJwtStrategy } from './strategies';
import { JwtAuthGuard, UserRolesGuard } from './guards';
import jwtConfig from 'src/configs/jwt.config';
import refreshJwtConfig from 'src/configs/refresh-jwt.config';
import googleOauthConfig from 'src/configs/google-oauth.config';
import { GoogleStrategy } from './strategies/google.stategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig),
    ConfigModule.forFeature(googleOauthConfig),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
    GoogleStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: UserRolesGuard,
    },
  ],
})
export class AuthModule {}
