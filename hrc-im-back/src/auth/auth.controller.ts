import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth/refresh-jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log(req.user);
    const {
      user: { id },
    } = req;

    return this.authService.login(id);
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh-token')
  refreshToken(@Req() req) {
    const {
      user: { id },
    } = req;

    return this.authService.refreshToken(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('sign-out')
  signOut(@Req() req) {
    this.authService.signOut(req.user.id);
  }
}
