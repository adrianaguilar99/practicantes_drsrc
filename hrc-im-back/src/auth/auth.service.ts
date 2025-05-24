import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import refreshJwtConfig from 'src/configs/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import * as argon2 from 'argon2';
import {
  INVALID_CREDENTIALS,
  INVALID_USER_OR_MISSING_REFRESH_TOKEN,
  REFRESH_TOKEN_DOES_NOT_MATCH,
  USER_LOGGED,
  USER_NOT_FOUND,
  USER_NOT_REGISTERED,
} from 'src/common/constants/constants';
import { AuthJwtPayload } from './types';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginAuthDto } from './dtos/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfiguration: ConfigType<typeof refreshJwtConfig>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    // console.log(user); // aqui salen todas las props del usuario
    if (!user)
      throw new UnauthorizedException(
        `${USER_NOT_FOUND} or ${USER_NOT_REGISTERED}`,
      );

    const isPasswordMatch = await compare(password, user.password);
    if (!isPasswordMatch) throw new UnauthorizedException(INVALID_CREDENTIALS);

    return { id: user.id };
  }

  async login(userId: string) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);
    const hashedRefreshToken = await argon2.hash(refreshToken);
    await this.usersService.updateHashedRefreshToken(
      userId,
      hashedRefreshToken,
    );

    return { id: userId, accessToken, refreshToken };
  }

  async generateTokens(userId: string) {
    const user = await this.usersService.findOne(userId);
    const payload: AuthJwtPayload = {
      sub: userId,
      fullName: `${user.firstName} ${user.lastName}`,
      role: user.userRole,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfiguration),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(userId: string) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);
    const hashedRefreshToken = await argon2.hash(refreshToken);
    await this.usersService.updateHashedRefreshToken(
      userId,
      hashedRefreshToken,
    );

    return { id: userId, accessToken, refreshToken };
  }

  async validateRefreshToken(userId: string, refreshToken: string) {
    const user = await this.usersService.findOne(userId);
    // console.log('Usuario:', user);
    // console.log('Refresh Token enviado:', refreshToken);
    // console.log('Refresh Token guardado:', user.hashedRefreshToken);

    if (!user || !user.hashedRefreshToken)
      throw new UnauthorizedException(INVALID_USER_OR_MISSING_REFRESH_TOKEN);

    const refreshTokenMatches = await argon2.verify(
      user.hashedRefreshToken,
      refreshToken,
    );

    // console.log('Resultado de la comparación:', refreshTokenMatches);

    if (!refreshTokenMatches)
      throw new UnauthorizedException(REFRESH_TOKEN_DOES_NOT_MATCH);

    return { id: userId };
  }

  async logout(userId: string) {
    await this.usersService.updateHashedRefreshToken(userId, null);
    return { message: `${USER_LOGGED}` };
  }

  async validateGoogleUser(googleUser: LoginAuthDto) {
    const user = await this.usersService.findByEmail(googleUser.email);

    if (user) return user;
    throw new UnauthorizedException(USER_NOT_REGISTERED);
  }
}
